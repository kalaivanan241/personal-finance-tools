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
import { Switch } from "@/components/ui/switch";
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

interface SWPSchedule {
  year: number;
  withdrawalAmount: number;
  remainingBalance: number;
}

function calculateSWPWithInflation(
  initialInvestment: number,
  monthlySWP: number,
  investmentDuration: number,
  isDurationInYears: boolean,
  expectedAnnualReturn: number,
  inflationRate: number
): SWPSchedule[] {
  const totalMonths = isDurationInYears
    ? investmentDuration * 12
    : investmentDuration;
  const monthlyInterestRate = expectedAnnualReturn / 100 / 12;
  const schedule: SWPSchedule[] = [];
  let remainingBalance = initialInvestment;
  const annualWithdrawalAmount = monthlySWP * 12;

  for (let month = 1; month <= totalMonths; month++) {
    const currentYear = Math.floor((month - 1) / 12);
    const adjustedWithdrawalAmount =
      annualWithdrawalAmount * Math.pow(1 + inflationRate / 100, currentYear);

    if (remainingBalance > 0) {
      const monthlyWithdrawal = Math.min(
        adjustedWithdrawalAmount / 12,
        remainingBalance
      );
      remainingBalance -= monthlyWithdrawal;
    }

    // Apply monthly interest
    remainingBalance *= 1 + monthlyInterestRate;

    if (month % 12 === 0 || month === totalMonths) {
      schedule.push({
        year: currentYear + 1,
        withdrawalAmount: remainingBalance < 0 ? 0 : adjustedWithdrawalAmount,
        remainingBalance: Math.max(remainingBalance, 0),
      });
    }
  }

  return schedule;
}

export default function SWPCalculatorInflation() {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlySWP, setMonthlySWP] = useState<number>(1000);
  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [isDurationInYears, setIsDurationInYears] = useState<boolean>(true);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [schedule, setSchedule] = useState<SWPSchedule[]>([]);

  const handleCalculate = () => {
    const result = calculateSWPWithInflation(
      initialInvestment,
      monthlySWP,
      investmentDuration,
      isDurationInYears,
      expectedAnnualReturn,
      inflationRate
    );
    setSchedule(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const totalWithdrawal = schedule.reduce(
    (sum, entry) => sum + entry.withdrawalAmount,
    0
  );
  const expectedRemainingAmount =
    schedule.length > 0 ? schedule[schedule.length - 1].remainingBalance : 0;
  const totalGrowth =
    expectedRemainingAmount + totalWithdrawal - initialInvestment;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>SWP Calculator with Inflation Adjustment</CardTitle>
          <CardDescription>
            Calculate your Systematic Withdrawal Plan with inflation
            consideration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlySWP">Monthly SWP</Label>
              <Input
                id="monthlySWP"
                type="number"
                value={monthlySWP}
                onChange={(e) => setMonthlySWP(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentDuration">Investment Duration</Label>
              <Input
                id="investmentDuration"
                type="number"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationToggle">Duration in Years</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="durationToggle"
                  checked={isDurationInYears}
                  onCheckedChange={setIsDurationInYears}
                />
                <span>{isDurationInYears ? "Years" : "Months"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedAnnualReturn">
                Expected Annual Return (%)
              </Label>
              <Input
                id="expectedAnnualReturn"
                type="number"
                value={expectedAnnualReturn}
                onChange={(e) =>
                  setExpectedAnnualReturn(Number(e.target.value))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
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
            <CardTitle>SWP Schedule with Inflation Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  Initial Investment
                </h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(initialInvestment)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  Expected Remaining Amount
                </h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(expectedRemainingAmount)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Total Withdrawal</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalWithdrawal)}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Total Growth</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalGrowth)}
                </p>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={schedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: "Year",
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
                    dataKey="withdrawalAmount"
                    name="Withdrawal Amount"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="remainingBalance"
                    name="Remaining Balance"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Withdrawal Amount</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((entry) => (
                    <TableRow key={entry.year}>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>
                        {formatCurrency(entry.withdrawalAmount)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(entry.remainingBalance)}
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
