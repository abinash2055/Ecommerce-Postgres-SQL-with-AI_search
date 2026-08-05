import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const statusSteps = ["Processing", "Shipped", "Delivered", "Cancelled"];

const getStepIndex = (status) => {
  switch (status) {
    case "Processing": return 0;
    case "Shipped": return 1;
    case "Delivered": return 2;
    case "Cancelled": return 3;
    default: return 0;
  }
};

const Orders = () => {

  const [statusFilter, setStatusFlter] = useState("All")
  const [trackOrderId, setTrackOrderId] = useState(null)
  const { myOrders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch])

  const filterOrders = myOrders.filter((order) => statusFilter === "All" || order.order_status === statusFilter)

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />
        break;

      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
        break;

      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
        break;

      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
        break;

      default:
        return <Package className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400"
        break;

      case "Shipped":
        return "bg-blue-500/20 text-blue-400"
        break;

      case "Delivered":
        return "bg-green-500/20 text-green-400"
        break;

      case "Cancelled":
        return "bg-red-500/20 text-red-400"
        break;

      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"]

  const { authUser } = useSelector((state) => state.auth)
  const navigateTo = useNavigate();

  if (!authUser) return navigateTo("/products")

  const selectedOrder = trackOrderId ? myOrders.find((o) => o.id === trackOrderId) : null;
  const currentStep = selectedOrder ? getStepIndex(selectedOrder.order_status) : 0;

  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your Order History....</p>
          </div>

          {/* Status Filter */}
          <div className="glass-card p-4 mb-8">
            <div className="flex items-center space-x-4 flex-wrap">

              <div className="flex flex-wrap gap-2">
                {statusArray.map((status) => {
                  return (
                    <button key={status} onClick={() => setStatusFlter(status)} className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${statusFilter === status ? "gradient-primary text-primary-foreground" : "glass-card hover:glow-on-hover text-foreground"}`}>{status}</button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order List */}
          {filterOrders.length === 0 ? (
            <div className="text-center glass-panel max-w-md mx-auto">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Orders Found</h2>
              <p className="text-muted-foreground">
                {statusFilter === "All" ? "You haven't placed any Order yet...." : `No Orders with status "${statusFilter} found...."`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filterOrders.map((order) => {
                return (
                  <div key={order.id} className="glass-card p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          Order #{order.id}
                        </h3>
                        <p className="text-muted-foreground">
                          Place on {" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.order_status)}
                          <span className={`px-3 py-1 rounded text-sm font-medium capitalize ${getStatusColor(order.order_status)}`}>{order.order_status}</span>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-primary">${order.total_price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order?.order_items?.map((item) => {
                        return (
                          <div
                            key={item.product_id}
                            className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg"
                          >
                            {/* Product Image */}
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 rounded-lg object-cover border"
                            />

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground truncate">
                                {item.title}
                              </h4>

                              <p className="text-sm text-muted-foreground mt-1">
                                Quantity: <span className="font-medium">{item.quantity}</span>
                              </p>
                            </div>

                            {/* Total */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Order Action */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
                      <button onClick={() => navigateTo(`/product/${order.order_items[0]?.product_id}`)} className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">View Details</button>
                      <button onClick={() => setTrackOrderId(order.id)} className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">Track Order</button>

                      {order.order_status === "Delivered" && (
                        <>
                          <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">Write Review</button>

                          <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">Reorder</button>
                        </>
                      )}

                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Track Order Modal */}
      {trackOrderId && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-md bg-[hsla(var(--glass-bg))]" onClick={() => setTrackOrderId(null)} />
          <div className="relative z-10 glass-panel w-full max-w-lg mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-primary">Track Order</h2>
                <div className="space-y-1 mt-1">
                  {selectedOrder?.order_items?.map((item) => (
                    <p key={item.product_id} className="text-xl font-bold text-foreground">{item.title}</p>
                  ))}
                </div>
              </div>
              <button onClick={() => setTrackOrderId(null)} className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth">
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;
                const isCancelled = selectedOrder.order_status === "Cancelled" && index === 3;

                return (
                  <div key={step} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? (isCancelled ? "bg-red-500/20 text-red-400" : "gradient-primary text-primary-foreground") : "bg-secondary text-muted-foreground"}`}>
                      {isCancelled ? (
                        <XCircle className="w-5 h-5" />
                      ) : isActive ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Package className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium capitalize ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step}</p>
                      {isCurrent && (
                        <p className="text-sm text-primary font-medium">Current Status</p>
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`w-8 h-0.5 ${index < currentStep ? "gradient-primary" : "bg-secondary"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Order Summary in Modal */}
            <div className="mt-6 pt-4 border-t border-[hsla(var(--glass-border))]">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary">${selectedOrder.total_price}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Placed on</span>
                <span className="text-foreground">{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;

