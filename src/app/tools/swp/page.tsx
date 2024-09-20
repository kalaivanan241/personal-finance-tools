export const runtime = "edge";
import SWPCalculator from "@/components/SWPCalculator/SWPCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWP Calculator with Inflation Adjustment - Optimize Your Withdrawals",
  description:
    "Calculate your Systematic Withdrawal Plan (SWP) with our advanced calculator that factors in inflation. Input your initial investment, monthly withdrawal amount, investment duration, expected returns, and inflation rate to generate a comprehensive withdrawal schedule. Start planning your financial future today!",
};

const page = () => {
  return <SWPCalculator />;
};

export default page;
