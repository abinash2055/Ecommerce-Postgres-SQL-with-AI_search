import React from "react";
import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlySalesChart = () => {
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18500 },
    { month: "Mar", sales: 15800 },
    { month: "Apr", sales: 24800 },
    { month: "May", sales: 22100 },
    { month: "Jun", sales: 29800 },
    { month: "Jul", sales: 33400 },
    { month: "Aug", sales: 28100 },
    { month: "Sep", sales: 36500 },
    { month: "Oct", sales: 42100 },
    { month: "Nov", sales: 47800 },
    { month: "Dec", sales: 53200 },
  ];

  return (
    <section className="w-full rounded-3xl bg-white shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Monthly Sales Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sales performance throughout the year
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            ▲ +18.6%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
            />

            <Tooltip
              cursor={{ strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#2563eb",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Highest Month</p>
          <h3 className="text-xl font-bold mt-2">$53.2K</h3>
          <p className="text-xs text-emerald-600 mt-1">December</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Average Sales</p>
          <h3 className="text-xl font-bold mt-2">$30.4K</h3>
          <p className="text-xs text-blue-600 mt-1">Per Month</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Growth</p>
          <h3 className="text-xl font-bold mt-2">+18.6%</h3>
          <p className="text-xs text-green-600 mt-1">Year over Year</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="text-xl font-bold mt-2">$365K</h3>
          <p className="text-xs text-purple-600 mt-1">Current Year</p>
        </div>
      </div>
    </section>
  );
};

export default MonthlySalesChart;