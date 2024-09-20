export const runtime = "edge";
import { MortgageSwpComparison } from "@/app/components/mortgage-swp-comparison";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "SWP and Mortgage Loan Comparison Calculator - Make Informed Financial Decisions",
  description:
    "Compare your Systematic Withdrawal Plan (SWP) with mortgage loan options using our comprehensive calculator. Input your investment details and loan parameters to analyze potential withdrawals and monthly payments. Empower your financial planning by making informed choices today!",
};

const page = () => {
  return <MortgageSwpComparison />;
};

export default page;
