export const runtime = "edge";
import { Metadata } from "next";
import PersonalLoanCalculator from "../components/Loans/PersonalLoan/PersonalLoanCalculator";

export const metadata: Metadata = {
  title:
    "Personal Loan Calculator - Estimate Your Monthly Payments and Interest Easily",
  description:
    "Use our Personal Loan Calculator to quickly estimate your monthly payments based on loan amount, interest rate, and term. Get a clear understanding of your financial commitments and plan your budget effectively. Start calculating your loan payments today",
};

const page = () => {
  return <PersonalLoanCalculator />;
};

export default page;
