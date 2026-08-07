// import Header from "./Header";
// import MiniSummary from "./dashboard-components/MiniSummary";
// import TopSellingProducts from "./dashboard-components/TopSellingProducts";
// import Stats from "./dashboard-components/Stats";
// import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
// import OrdersChart from "./dashboard-components/OrdersChart";
// import TopProductsChart from "./dashboard-components/TopProductsChart";

// const Dashboard = () => {
//   return (
//     <>
//       <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full">
//         <div className="flex-1 md:p-6">
//           <Header />
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p>Check sales, value and bounce rate by cities of Nepal.</p>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Dashboard;

import Header from "./Header";
import MiniSummary from "./dashboard-components/MiniSummary";
import TopSellingProducts from "./dashboard-components/TopSellingProducts";
import Stats from "./dashboard-components/Stats";
import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
import OrdersChart from "./dashboard-components/OrdersChart";
import TopProductsChart from "./dashboard-components/TopProductsChart";

const Dashboard = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-50 p-[10px] pl-[10px] md:pl-[17rem] w-full">
        <div className="flex-1 md:p-6">

          {/* Header */}
          <Header />

          {/* Page Heading (Kept Unchanged) */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Check sales, value and bounce rate by cities of Nepal.</p>
            <p className="text-sm italic mt-2">Sorry for Static Data.</p>
          </div>

          {/* Stats Cards */}
          <section className="mb-8">
            <Stats />
          </section>

          {/* Mini Summary */}
          <section className="mb-8">
            <MiniSummary />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

            <div className="xl:col-span-2">
              <MonthlySalesChart />
            </div>

            <div>
              <OrdersChart />
            </div>

          </section>

          {/* Products Analytics */}
          <section className="mb-8">
            <TopProductsChart />
          </section>

          {/* Top Selling Products */}
          <section className="mb-8">
            <TopSellingProducts />
          </section>

        </div>
      </main>
    </>
  );
};

export default Dashboard;