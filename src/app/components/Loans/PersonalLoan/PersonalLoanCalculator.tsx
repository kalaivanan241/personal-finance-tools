"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import AmortizationSchedule from "../AmortizationSchedule";
import PersonalLoanDetailsDisplay from "../PersonalLoanDetails";

type PersonalLoanDetails = {
  loanAmount: number | null;
  interestRate: number | null;
  loanTermInYears: number | null;
  downPayment: number | null;
  monthlyPayment: number | null;
};

function calculatePersonalLoanPayment(
  props: PersonalLoanDetails
): PersonalLoanDetails | string {
  const {
    loanAmount,
    interestRate,
    loanTermInYears,
    downPayment,
    monthlyPayment,
  } = props;
  // Calculate the monthly interest rate
  function monthlyRate(rate: number | null): number | null {
    return rate !== null ? rate / 1200 : null;
  }

  // Calculate the number of payments
  function numberOfPayments(term: number | null): number | null {
    return term !== null ? term * 12 : null;
  }

  // Function to calculate monthly payment based on loan details
  function calculateMonthlyPayment(
    loanAmount: number,
    monthlyInterestRate: number,
    numberOfPayments: number,
    downPayment: number
  ): number {
    const loanAmountAfterDownPayment = loanAmount - downPayment;
    return (
      (loanAmountAfterDownPayment *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    );
  }

  // Function to calculate interest rate using binary search
  function calculateInterestRate(
    loanAmount: number,
    loanTermInYears: number,
    downPayment: number,
    monthlyPayment: number
  ): number {
    let low = 0;
    let high = 20; // Assume an upper limit of 20% for the interest rate
    const tolerance = 0.0001; // Acceptable error margin

    while (high - low > tolerance) {
      const mid = (low + high) / 2;
      const monthlyInterestRate = mid / 1200;
      const n = numberOfPayments(loanTermInYears);
      if (n === null) continue;
      const calculatedPayment = calculateMonthlyPayment(
        loanAmount,
        monthlyInterestRate,
        n,
        downPayment
      );

      if (Math.abs(calculatedPayment - monthlyPayment) < tolerance) {
        return mid; // Return the estimated interest rate
      } else if (calculatedPayment < monthlyPayment) {
        low = mid; // Increase interest rate
      } else {
        high = mid; // Decrease interest rate
      }
    }

    return low; // Return the final low value as the estimated interest rate
  }

  // Check which value is missing and calculate it
  if (
    loanAmount !== null &&
    interestRate !== null &&
    loanTermInYears !== null &&
    downPayment !== null
  ) {
    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      monthlyRate(interestRate)!,
      numberOfPayments(loanTermInYears)!,
      downPayment
    );
    return { ...props, monthlyPayment };
  } else if (
    monthlyPayment !== null &&
    loanTermInYears !== null &&
    interestRate !== null &&
    downPayment !== null
  ) {
    // Calculate loan amount
    const monthlyInterestRate = monthlyRate(interestRate)!;
    const n = numberOfPayments(loanTermInYears)!;
    const loanAmountAfterDownPayment =
      (monthlyPayment * ((1 + monthlyInterestRate) ** n - 1)) /
      (monthlyInterestRate * (1 + monthlyInterestRate) ** n);
    return { ...props, loanAmount: loanAmountAfterDownPayment + downPayment };
  } else if (
    loanAmount !== null &&
    monthlyPayment !== null &&
    interestRate !== null &&
    downPayment !== null
  ) {
    // Calculate loan term
    const monthlyInterestRate = monthlyRate(interestRate)!;
    const loanAmountAfterDownPayment = loanAmount - downPayment;
    let n = 0;
    n =
      (loanAmountAfterDownPayment * monthlyInterestRate) /
      (monthlyPayment * (1 + monthlyInterestRate) ** n);
    return { ...props, loanTermInYears: n / 12 };
  } else if (
    monthlyPayment !== null &&
    loanAmount !== null &&
    loanTermInYears !== null &&
    downPayment !== null
  ) {
    // Calculate interest rate
    const estimatedInterestRate = calculateInterestRate(
      loanAmount,
      loanTermInYears,
      downPayment,
      monthlyPayment
    );
    return { ...props, interestRate: estimatedInterestRate };
  } else {
    return "Insufficient data provided";
  }
}

interface AmortizationSchedule {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

function calculateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTermInYears: number,
  monthlyPayment: number
): AmortizationSchedule[] {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = loanTermInYears * 12;

  const schedule: AmortizationSchedule[] = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= totalPayments; month++) {
    const interest = remainingBalance * monthlyInterestRate;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      month,
      payment: monthlyPayment,
      interest: interest,
      principal: principal,
      remainingBalance: Math.max(remainingBalance, 0), // Ensure no negative balance
    });
  }

  return schedule;
}

function InputField(props: {
  label: string;
  value: number | null;
  setter: (value: number | null) => void;
  placeholder: string;
}) {
  const { label, value, setter, placeholder } = props;

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={label.toLowerCase().replace(" ", "-")}>{label}</Label>
      <Input
        type="number"
        id={label.toLowerCase().replace(" ", "-")}
        placeholder={placeholder}
        value={value === null ? "" : value}
        onChange={(e) =>
          setter(e.target.value ? parseFloat(e.target.value) : null)
        }
      />
    </div>
  );
}

function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [loanTermInYears, setLoanTermInYears] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [result, setResult] = useState<PersonalLoanDetails | string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    const calculationResult = calculatePersonalLoanPayment({
      loanAmount,
      interestRate,
      loanTermInYears,
      downPayment: 0,
      monthlyPayment,
    });
    if (typeof calculationResult === "string") {
      setError(calculationResult);
      setResult(null);
    } else {
      setResult(calculationResult);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 space-y-8">
        <div className="gap-2 md:flex">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Personal Loan Calculator</CardTitle>
              <CardDescription>
                Calculate your loan, just input any 3 input fields
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField
                label="Loan Amount"
                value={loanAmount}
                setter={setLoanAmount}
                placeholder="Enter loan amount"
              />
              <InputField
                label="Interest Rate"
                value={interestRate}
                setter={setInterestRate}
                placeholder="Enter interest rate"
              />
              <InputField
                label="Loan Term (Years)"
                value={loanTermInYears}
                setter={setLoanTermInYears}
                placeholder="Enter loan term in years"
              />
              <InputField
                label="Monthly Payment"
                value={monthlyPayment}
                setter={setMonthlyPayment}
                placeholder="Enter monthly payment"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleCalculate}>Calculate</Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
          {result !== null && typeof result !== "string" && (
            <>
              <PersonalLoanDetailsDisplay details={result} />
            </>
          )}
        </div>
      </div>
      {result !== null && typeof result !== "string" && (
        <>
          <AmortizationSchedule
            data={calculateAmortizationSchedule(
              result.loanAmount!,
              result.interestRate!,
              result.loanTermInYears!,
              result.monthlyPayment!
            )}
          />
        </>
      )}
    </>
  );
}

export default PersonalLoanCalculator;
