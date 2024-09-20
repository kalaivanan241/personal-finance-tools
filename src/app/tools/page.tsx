export const runtime = "edge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, LineChart, TrendingUp } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Tools: Essential Personal Finance Tools: SIP, SWP, Loans & Calculators",
  description:
    "Explore essential personal finance tools including SIP, SWP, personal loan calculators, and mortgage loan solutions. Simplify your financial decisions today!",
};

const navigation = [
  {
    name: "SIP",
    href: "/tools/sip",
    icon: TrendingUp,
    description: "SIP calculator for mutual funds",
  },
  {
    name: "SWP",
    href: "/tools/swp",
    icon: DollarSign,
    description: "SWP calculator for mutual funds",
  },
  {
    name: "SWP Inflation",
    href: "/tools/swp-inflation",
    icon: LineChart,
    description: "SWP calculator with inflation",
  },
  {
    name: "Mortage SWP comparison",
    href: "/tools/mortgage-swp-comparison",
    icon: LineChart,
    description: "Mortage SWP comparison calculator",
  },
];

const IconWrapper = ({ Icon }: { Icon: React.ElementType }) => (
  <div className="p-2 bg-primary/10 rounded-full">
    <Icon className="w-6 h-6 text-primary" />
  </div>
);

const NavCard = ({ item }: { item: (typeof navigation)[0] }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div>
        <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {item.description}
        </CardDescription>
      </div>
      <IconWrapper Icon={item.icon} />
    </CardHeader>
    <CardContent>
      <Link
        href={item.href}
        className="text-sm text-muted-foreground hover:underline"
      >
        View {item.name}
      </Link>
    </CardContent>
  </Card>
);

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigation.map((item) => (
          <div key={item.name}>
            <NavCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
