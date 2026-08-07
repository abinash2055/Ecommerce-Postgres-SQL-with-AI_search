import React from "react";

const TopSellingProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 16 Pro Max",
      category: "Smartphone",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      sold: 1245,
      revenue: "$248,900",
      rating: 4.9,
      stock: 32,
    },
    {
      id: 2,
      name: "MacBook Pro M4",
      category: "Laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzSROe7alQIBMn6dq3YPFD3QRhAiVYYimCGUv7J90XA&s=10",
      sold: 985,
      revenue: "$315,400",
      rating: 4.8,
      stock: 18,
    },
    {
      id: 3,
      name: "AirPods Pro",
      category: "Accessories",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiafhTdaqS_FSmGxCScl0RcBJIvyVvVXN8xC_0RHBEgw&s=10",
      sold: 876,
      revenue: "$92,300",
      rating: 4.7,
      stock: 54,
    },
    {
      id: 4,
      name: "Apple Watch Ultra",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300",
      sold: 742,
      revenue: "$138,700",
      rating: 4.9,
      stock: 27,
    },
    {
      id: 5,
      name: "iPad Air",
      category: "Tablet",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
      sold: 615,
      revenue: "$116,500",
      rating: 4.8,
      stock: 41,
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Top Selling Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Best performing products this month
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="space-y-5">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group flex flex-col gap-5 rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl lg:flex-row lg:items-center lg:justify-between px-4 mx-4"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                #{index + 1}
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {product.category}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    ⭐ {product.rating}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {product.stock} Left
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-8 lg:gap-10">
              <div>
                <p className="text-sm text-gray-500">Units Sold</p>

                <h3 className="mt-2 text-xl font-bold text-gray-800">
                  {product.sold}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500">Revenue</p>

                <h3 className="mt-2 text-xl font-bold text-emerald-600">
                  {product.revenue}
                </h3>
              </div>

              <div className="col-span-2 md:col-span-1">
                <p className="text-sm text-gray-500">Performance</p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    style={{
                      width: `${(product.sold / 1245) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-gray-500">Total Products</p>
          <h3 className="mt-2 text-2xl font-bold">5</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-gray-500">Units Sold</p>
          <h3 className="mt-2 text-2xl font-bold">4,463</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-600">
            $911.8K
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-gray-500">Growth</p>
          <h3 className="mt-2 text-2xl font-bold text-indigo-600">
            +24.6%
          </h3>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;