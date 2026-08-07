import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TopProductsChart = () => {
  const products = [
    {
      name: "iPhone 16 Pro",
      sales: 820,
      revenue: "$246K",
      color: "#2563eb",
    },
    {
      name: "MacBook Pro",
      sales: 690,
      revenue: "$198K",
      color: "#7c3aed",
    },
    {
      name: "AirPods Pro",
      sales: 560,
      revenue: "$102K",
      color: "#14b8a6",
    },
    {
      name: "Apple Watch",
      sales: 420,
      revenue: "$86K",
      color: "#f59e0b",
    },
    {
      name: "iPad Air",
      sales: 315,
      revenue: "$74K",
      color: "#ef4444",
    },
  ];

  return (
    <section className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Top Selling Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Best performing products based on sales volume
          </p>
        </div>

        <div className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700">
          Top 5 Products
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {/* Chart */}
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={products}
              margin={{
                top: 10,
                right: 20,
                left: -20,
                bottom: 10,
              }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                }}
                formatter={(value) => [value, "Units Sold"]}
              />

              <Bar
                dataKey="sales"
                radius={[10, 10, 0, 0]}
                barSize={45}
              >
                {products.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Cards */}
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
                    style={{
                      backgroundColor: product.color,
                    }}
                  >
                    #{index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Revenue: {product.revenue}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.sales}
                  </h2>

                  <p className="text-xs text-gray-400">
                    Units Sold
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(product.sales / 820) * 100}%`,
                    backgroundColor: product.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Top Product</p>
          <h3 className="mt-2 text-xl font-bold">
            iPhone 16 Pro
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Units Sold</p>
          <h3 className="mt-2 text-xl font-bold">
            2,805
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Revenue</p>
          <h3 className="mt-2 text-xl font-bold">
            $706K
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Growth</p>
          <h3 className="mt-2 text-xl font-bold text-green-600">
            +21.8%
          </h3>
        </div>
      </div>
    </section>
  );
};

export default TopProductsChart;