export const runtime = "edge";

import SIPCalculator from "@/app/components/SIPCalculator/SIPCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "SIP Calculator - Plan Your Investments and Achieve Your Financial Goals",
  description:
    "Use our powerful SIP (Systematic Investment Plan) calculator to plan your investments and reach your financial objectives. Input your monthly investment amount, expected returns, and investment duration to generate a detailed growth projection. Start investing today and watch your wealth grow over time!",
};

const page = () => {
  return <SIPCalculator />;
};

export default page;
