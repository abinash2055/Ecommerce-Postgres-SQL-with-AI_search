import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../store/slices/orderSlice";

const Payment = () => {

  const { authUser } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  if (!authUser) return navigateTo("/products");

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    loadStripe("pk_test_51QeUn6P6rKjXAuEy7wwM6pZB9ZjSWay5KstFeB4qa5RK1ixH4qT6ZOz0v4t4OAEfoq5LhRWjPhvldN9qgzAsrkI500YqYHflPB").then((stripe) => setStripePromise(stripe)).catch((err) => console.log(err))
  }, [])

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart)
  const { orderStep } = useSelector((state) => state.order)

  const [shippingDetails, setShippingDetails] = useState({ fullName: "", state: "Bagmati", phone: "", address: "", city: "", zipCode: "", country: "Nepal" })

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const tax = subtotal * 0.13;
  const shipping = subtotal > 50 ? 0 : 2;
  const totalWithTax = subtotal + tax + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("full_name", shippingDetails.fullName)
    formData.append("state", shippingDetails.state)
    formData.append("city", shippingDetails.city)
    formData.append("country", shippingDetails.country)
    formData.append("address", shippingDetails.address)
    formData.append("pincode", shippingDetails.zipCode)
    formData.append("phone", shippingDetails.phone)
    formData.append("orderedItems", JSON.stringify(cart))

    dispatch(placeOrder(formData));
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center glass-panel max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-4">No Items in Cart.</h1>
          <p className="text-muted-foreground mb-8">Add some Items to your Cart before Procesing to Checkout....</p>

          <Link to={"/products"} className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-primary-foreground gradient-primary hover:glow-on-hover animate-smooth font-semibold">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Link to={"/cart"} className="p-2 glass-card hover:glow-on-hover animate-smooth">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </Link>
            </div>

            {/* Process Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                {/* Step 1 */}
                <div className={`flex items-center space-x-2 ${orderStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 1 ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}>
                    {orderStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>

                  <span className="font-medium">Details</span>
                </div>

                <div className={`w-12 h-0 ${orderStep >= 2 ? "bg-primary" : "bg-border"}`} />

                {/* Step 2 */}
                <div className={`flex items-center space-x-2 ${orderStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 2 ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}>2 </div>

                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                {orderStep === 1 ? (
                  // User Details
                  <form onSubmit={handlePlaceOrder} className="glass-panel">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Shipping Information</h2>

                    <div className="mb-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <input type="text" required value={shippingDetails.fullName} onChange={(e) => { setShippingDetails({ ...shippingDetails, fullName: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                        <select value={shippingDetails.state} onChange={(e) => { setShippingDetails({ ...shippingDetails, state: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground">
                          <option value="Province 1 (Koshi Province)">Province 1 (Koshi Province)</option>
                          <option value="Province 2 (Madhesh Province)">Province 2 (Madhesh Province)</option>
                          <option value="Province 3 (Bagmati Province)">Province 3 (Bagmati Province)</option>
                          <option value="Province 4 (Gandaki Province)">Province 4 (Gandaki Province)</option>
                          <option value="Province 5 (Lumbini Province)">Province 5 (Lumbini Province)</option>
                          <option value="Province 6 (Karnali Province)">Province 6 (Karnali Province)</option>
                          <option value="Province 7 (Sudurpashchim Province)">Province 7 (Sudurpashchim Province)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <input type="tel" required value={shippingDetails.phone} onChange={(e) => { setShippingDetails({ ...shippingDetails, phone: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <input type="text" required value={shippingDetails.address} onChange={(e) => { setShippingDetails({ ...shippingDetails, address: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                        <input type="text" required value={shippingDetails.city} onChange={(e) => { setShippingDetails({ ...shippingDetails, city: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                        <input type="text" required value={shippingDetails.zipCode} onChange={(e) => { setShippingDetails({ ...shippingDetails, zipCode: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                        <select value={shippingDetails.country} onChange={(e) => { setShippingDetails({ ...shippingDetails, country: e.target.value }) }} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground">
                          <option value="Nepal">Nepal</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold">Continue to Payment</button>
                  </form>
                ) : (
                  <>
                    <Elements stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                  </>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-panel sticky top-24">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between pb-4 border-b border-[hsla(var(--glass-border))]"
                      >
                        {/* Left Side */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {item.product.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Right Side */}
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-[hsla(var(--glass-border))] pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-500">
                        {subtotal > 50 ? "Free" : "$2"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[hsla(var(--glass-border))]">
                      <span>Total</span>
                      <span className="text-primary">${totalWithTax.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
