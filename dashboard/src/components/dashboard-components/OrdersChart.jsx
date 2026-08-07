import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const OrdersChart = () => {
  const orderData = [
    { name: "Delivered", value: 420, color: "#22c55e" },
    { name: "Processing", value: 145, color: "#3b82f6" },
    { name: "Shipped", value: 98, color: "#f59e0b" },
    { name: "Cancelled", value: 37, color: "#ef4444" },
  ];

  const totalOrders = orderData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="w-full rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Orders Analytics
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Distribution of all order statuses
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {totalOrders} Orders
        </span>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-[320px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={5}
                stroke="none"
              >
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value} Orders`, "Total"]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-4xl font-bold text-gray-800">
              {totalOrders}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Total Orders
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="space-y-4">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {(
                      (item.value / totalOrders) *
                      100
                    ).toFixed(1)}
                    % of Orders
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-gray-500">Success Rate</p>
          <h3 className="text-2xl font-bold text-green-600 mt-2">
            91%
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-gray-500">Processing</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            145
          </h3>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4">
          <p className="text-sm text-gray-500">In Transit</p>
          <h3 className="text-2xl font-bold text-yellow-600 mt-2">
            98
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-4">
          <p className="text-sm text-gray-500">Cancelled</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">
            37
          </h3>
        </div>
      </div>
    </section>
  );
};

export default OrdersChart;