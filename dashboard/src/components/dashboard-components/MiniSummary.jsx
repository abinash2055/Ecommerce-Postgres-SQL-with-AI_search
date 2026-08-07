import React from "react";
import {
  Wallet,
  PackageCheck,
  TrendingUp,
  AlertTriangle,
  BarChart4,
  UserPlus,
} from "lucide-react";

const MiniSummary = () => {
  const summaryData = [
    {
      title: "Today's Revenue",
      value: "$12,450",
      subtitle: "+18.2% from yesterday",
      icon: Wallet,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
    },
    {
      title: "Orders Delivered",
      value: "245",
      subtitle: "98% successful deliveries",
      icon: PackageCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
    },
    {
      title: "Revenue Growth",
      value: "+23.5%",
      subtitle: "Compared to last month",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      border: "border-purple-500",
    },
    {
      title: "Low Stock",
      value: "8",
      subtitle: "Products need restocking",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      border: "border-red-500",
    },
    {
      title: "Monthly Sales",
      value: "$94.2K",
      subtitle: "Current month performance",
      icon: BarChart4,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
    },
    {
      title: "New Customers",
      value: "124",
      subtitle: "Joined this month",
      icon: UserPlus,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      border: "border-cyan-500",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {summaryData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border-l-4 ${item.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gray-100 opacity-20 -translate-y-10 translate-x-10" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {item.subtitle}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    className={`h-7 w-7 ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>
              </div>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.iconBg.replace(
                    "100",
                    "500"
                  )} w-3/4`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MiniSummary;