import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AmortizationEntry {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

interface AmortizationScheduleProps {
  data: AmortizationEntry[];
}

export default function AmortizationSchedule({
  data,
}: AmortizationScheduleProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Amortization Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Balance and Payment Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  label={{
                    value: "Month",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Amount ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="remainingBalance"
                  stroke="#8884d8"
                  name="Remaining Balance"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="payment"
                  stroke="#82ca9d"
                  name="Payment"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Interest vs Principal Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  label={{
                    value: "Month",
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
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar
                  dataKey="interest"
                  stackId="a"
                  fill="#8884d8"
                  name="Interest"
                />
                <Bar
                  dataKey="principal"
                  stackId="a"
                  fill="#82ca9d"
                  name="Principal"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Amortization Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Remaining Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.month}>
                    <TableCell>{entry.month}</TableCell>
                    <TableCell>{formatCurrency(entry.payment)}</TableCell>
                    <TableCell>{formatCurrency(entry.interest)}</TableCell>
                    <TableCell>{formatCurrency(entry.principal)}</TableCell>
                    <TableCell>
                      {formatCurrency(entry.remainingBalance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
