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

function calculateSIP(
  initialInvestment: number,
  monthlySIP: number,
  investmentDuration: number,
  isDurationInYears: boolean,
  expectedAnnualReturn: number
): number {
  const totalMonths = isDurationInYears
    ? investmentDuration * 12
    : investmentDuration;
  const monthlyInterestRate = expectedAnnualReturn / 100 / 12;
  const futureValueLumpSum =
    initialInvestment * Math.pow(1 + monthlyInterestRate, totalMonths);
  let futureValueSIP = 0;
  for (let month = 1; month <= totalMonths; month++) {
    futureValueSIP +=
      monthlySIP * Math.pow(1 + monthlyInterestRate, totalMonths - month);
  }
  return futureValueLumpSum + futureValueSIP;
}

export default function SIPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlySIP, setMonthlySIP] = useState<number>(500);
  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [isDurationInYears, setIsDurationInYears] = useState<boolean>(true);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(12);
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCalculate = () => {
    const expectedAmount = calculateSIP(
      initialInvestment,
      monthlySIP,
      investmentDuration,
      isDurationInYears,
      expectedAnnualReturn
    );
    setResult(expectedAmount);

    // Generate chart data
    const data = [];
    const totalMonths = isDurationInYears
      ? investmentDuration * 12
      : investmentDuration;
    for (let month = 0; month <= totalMonths; month++) {
      const amount = calculateSIP(
        initialInvestment,
        monthlySIP,
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
          <CardTitle>SIP Calculator</CardTitle>
          <CardDescription>
            Calculate your Systematic Investment Plan returns
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
              <Label htmlFor="monthlySIP">Monthly SIP</Label>
              <Input
                id="monthlySIP"
                type="number"
                value={monthlySIP}
                onChange={(e) => setMonthlySIP(Number(e.target.value))}
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
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCalculate}>Calculate</Button>
        </CardFooter>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>SIP Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">
              Expected Amount: {formatCurrency(result)}
            </div>
            <div className="space-y-2">
              <div>Initial Investment: {formatCurrency(initialInvestment)}</div>
              <div>
                Total Investment:{" "}
                {formatCurrency(
                  initialInvestment +
                    monthlySIP *
                      (isDurationInYears
                        ? investmentDuration * 12
                        : investmentDuration)
                )}
              </div>
              <div>
                Total Returns:{" "}
                {formatCurrency(
                  result -
                    (initialInvestment +
                      monthlySIP *
                        (isDurationInYears
                          ? investmentDuration * 12
                          : investmentDuration))
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
