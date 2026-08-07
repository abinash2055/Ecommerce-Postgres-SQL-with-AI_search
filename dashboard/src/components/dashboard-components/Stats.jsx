import React from "react";
import {
  Wallet,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Stats = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$12,450",
      change: "+18.2%",
      positive: true,
      icon: Wallet,
      bg: "from-emerald-500 to-green-600",
      light: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Users",
      value: "15,846",
      change: "+6.8%",
      positive: true,
      icon: Users,
      bg: "from-blue-500 to-cyan-600",
      light: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "All Time Revenue",
      value: "$286.4K",
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
      bg: "from-purple-500 to-indigo-600",
      light: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="w-full">

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Gradient */}
              <div
                className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${item.bg} opacity-10 blur-2xl`}
              />

              {/* Top */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.light}`}
                >
                  <Icon
                    className={`h-8 w-8 ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-8 flex items-center justify-between">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${item.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {item.positive ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}

                  {item.change}
                </div>

                <span className="text-sm text-gray-400">
                  vs last month
                </span>
              </div>

              {/* Progress */}
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.bg} w-4/5`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;