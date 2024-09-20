"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ComparisonSchedule {
  month: number;
  emi: number;
  remainingSWPInvestment: number;
  remainingLoan: number;
}

function calculateComparison(
  mortgageDetails: {
    loanAmount: number;
    interest: number;
    termInYears: number;
  },
  swpDetails: { investmentAmount: number; returnPercentage: number }
): ComparisonSchedule[] {
  const { loanAmount, interest, termInYears } = mortgageDetails;
  const { investmentAmount, returnPercentage } = swpDetails;

  const monthlyInterestRate = interest / 100 / 12;
  const totalPayments = termInYears * 12;
  const emi =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  const schedule: ComparisonSchedule[] = [];
  let remainingLoan = loanAmount;
  let remainingSWPInvestment = investmentAmount;
  const monthlyReturnRate = returnPercentage / 100 / 12;

  for (let month = 1; month <= totalPayments; month++) {
    const swpWithdrawal = emi;
    const interestEarned = remainingSWPInvestment * monthlyReturnRate;
    remainingSWPInvestment += interestEarned - swpWithdrawal;
    const interestForLoan = remainingLoan * monthlyInterestRate;
    remainingLoan -= emi - interestForLoan;

    schedule.push({
      month,
      emi,
      remainingSWPInvestment: Math.max(remainingSWPInvestment, 0),
      remainingLoan: Math.max(remainingLoan, 0),
    });
  }

  return schedule;
}

export function MortgageSwpComparison() {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [loanInterest, setLoanInterest] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [swpInvestment, setSWPInvestment] = useState<number>(100000);
  const [swpReturn, setSWPReturn] = useState<number>(8);
  const [schedule, setSchedule] = useState<ComparisonSchedule[]>([]);

  const handleCalculate = () => {
    const result = calculateComparison(
      { loanAmount, interest: loanInterest, termInYears: loanTerm },
      { investmentAmount: swpInvestment, returnPercentage: swpReturn }
    );
    setSchedule(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Mortgage vs SWP Comparison Calculator</CardTitle>
          <CardDescription>
            Compare a mortgage loan with a Systematic Withdrawal Plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanInterest">Loan Interest Rate (%)</Label>
              <Input
                id="loanInterest"
                type="number"
                value={loanInterest}
                onChange={(e) => setLoanInterest(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="swpInvestment">SWP Investment Amount</Label>
              <Input
                id="swpInvestment"
                type="number"
                value={swpInvestment}
                onChange={(e) => setSWPInvestment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="swpReturn">SWP Expected Return (%)</Label>
              <Input
                id="swpReturn"
                type="number"
                value={swpReturn}
                onChange={(e) => setSWPReturn(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCalculate}>Calculate</Button>
        </CardFooter>
      </Card>

      {schedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={schedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: "Month",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Amount ($)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="remainingSWPInvestment"
                    name="Remaining SWP Investment"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="remainingLoan"
                    name="Remaining Loan"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Remaining SWP Investment</TableHead>
                    <TableHead>Remaining Loan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((entry) => (
                    <TableRow key={entry.month}>
                      <TableCell>{entry.month}</TableCell>
                      <TableCell>{formatCurrency(entry.emi)}</TableCell>
                      <TableCell>
                        {formatCurrency(entry.remainingSWPInvestment)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(entry.remainingLoan)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
