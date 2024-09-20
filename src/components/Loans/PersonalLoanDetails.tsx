import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, DollarSign, HomeIcon, PercentIcon } from "lucide-react";

type PersonalLoanDetails = {
  loanAmount: number | null;
  interestRate: number | null;
  loanTermInYears: number | null;
  downPayment: number | null;
  monthlyPayment: number | null;
};

interface PersonalLoanDetailsProps {
  details: PersonalLoanDetails;
}

export default function PersonalLoanDetailsDisplay({
  details,
}: PersonalLoanDetailsProps) {
  const formatCurrency = (value: number | null) => {
    if (value === null) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercentage = (value: number | null) => {
    if (value === null) return "Not specified";
    return `${value.toFixed(2)}%`;
  };

  const formatYears = (value: number | null) => {
    if (value === null) return "Not specified";
    return value === 1 ? "1 year" : `${value} years`;
  };

  const detailItems = [
    {
      icon: HomeIcon,
      label: "Loan Amount",
      value: formatCurrency(details.loanAmount),
    },
    {
      icon: PercentIcon,
      label: "Interest Rate",
      value: formatPercentage(details.interestRate),
    },
    {
      icon: CalendarIcon,
      label: "Loan Term",
      value: formatYears(details.loanTermInYears),
    },
    {
      icon: DollarSign,
      label: "Monthly Payment",
      value: formatCurrency(details.monthlyPayment),
    },
    {
      icon: DollarSign,
      label: "Monthly Payment",
      value: formatCurrency(
        (details.monthlyPayment ?? 0) * 12 * (details.loanTermInYears ?? 0)
      ),
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Personal Loan Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {detailItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <item.icon className="w-8 h-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {item.label}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
