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

function calculateSWP(
  currentInvestment: number,
  monthlySWP: number,
  withdrawalDuration: number,
  isDurationInYears: boolean,
  expectedAnnualReturn: number
): number {
  const totalMonths = isDurationInYears
    ? withdrawalDuration * 12
    : withdrawalDuration;
  const monthlyInterestRate = expectedAnnualReturn / 100 / 12;
  const futureValueInvestment =
    currentInvestment * Math.pow(1 + monthlyInterestRate, totalMonths);
  let presentValueSWP = 0;
  for (let month = 1; month <= totalMonths; month++) {
    presentValueSWP += monthlySWP * Math.pow(1 + monthlyInterestRate, -month);
  }
  return futureValueInvestment - presentValueSWP;
}

export default function SWPCalculator() {
  const [currentInvestment, setCurrentInvestment] = useState<number>(100000);
  const [monthlySWP, setMonthlySWP] = useState<number>(1000);
  const [withdrawalDuration, setWithdrawalDuration] = useState<number>(5);
  const [isDurationInYears, setIsDurationInYears] = useState<boolean>(true);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(8);
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCalculate = () => {
    const expectedRemainingAmount = calculateSWP(
      currentInvestment,
      monthlySWP,
      withdrawalDuration,
      isDurationInYears,
      expectedAnnualReturn
    );
    setResult(expectedRemainingAmount);

    // Generate chart data
    const data = [];
    const totalMonths = isDurationInYears
      ? withdrawalDuration * 12
      : withdrawalDuration;
    for (let month = 0; month <= totalMonths; month++) {
      const amount = calculateSWP(
        currentInvestment,
        monthlySWP,
        month,
        false,
        expectedAnnualReturn
      );
      data.push({
        month: month,
        amount: amount,
      });
    }
    setChartData(data);
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
          <CardTitle>SWP Calculator</CardTitle>
          <CardDescription>
            Calculate your Systematic Withdrawal Plan results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentInvestment">Current Investment</Label>
              <Input
                id="currentInvestment"
                type="number"
                value={currentInvestment}
                onChange={(e) => setCurrentInvestment(Number(e.target.value))}
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
              <Label htmlFor="withdrawalDuration">Withdrawal Duration</Label>
              <Input
                id="withdrawalDuration"
                type="number"
                value={withdrawalDuration}
                onChange={(e) => setWithdrawalDuration(Number(e.target.value))}
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
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCalculate}>Calculate</Button>
        </CardFooter>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>SWP Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">
              Expected Remaining Amount: {formatCurrency(result)}
            </div>
            <div className="space-y-2">
              <div>Initial Investment: {formatCurrency(currentInvestment)}</div>
              <div>
                Total Withdrawal:{" "}
                {formatCurrency(
                  monthlySWP *
                    (isDurationInYears
                      ? withdrawalDuration * 12
                      : withdrawalDuration)
                )}
              </div>
              <div>
                Total Growth:{" "}
                {formatCurrency(
                  result -
                    currentInvestment +
                    monthlySWP *
                      (isDurationInYears
                        ? withdrawalDuration * 12
                        : withdrawalDuration)
                )}
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: isDurationInYears ? "Months" : "Years",
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
                    dataKey="amount"
                    stroke="#8884d8"
                    name="Investment Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
