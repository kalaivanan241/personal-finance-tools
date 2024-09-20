export const runtime = "edge";
import SWPCalculatorInflation from "@/components/SWPCalculator/SWPCalculatorInflation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "SWP: Calculator with Inflation Adjustment - Plan Your Withdrawals Wisely",
  description:
    "Use our SWP Calculator to estimate your systematic withdrawals while considering inflation. Input your initial investment, monthly withdrawal amount, and expected returns to generate a detailed withdrawal schedule. Start planning for your financial future today!",
};

const pages = () => {
  return <SWPCalculatorInflation />;
};

export default pages;
