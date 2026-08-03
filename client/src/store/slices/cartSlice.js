import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const stored = localStorage.getItem("cart");
  if (stored) {
    try {
      return { cart: JSON.parse(stored) };
    } catch {
      return { cart: [] };
    }
  }
  return { cart: [] };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  
  reducers: {
    // To add Produt in Cart
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },

    // To Remove Product in Cart
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.product.id !== action.payload)
    },

    // To Update Product in Cart
    updateCartQuantity(state, action) {
      const item = state.cart.find((item) => item.product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // To clear Product in Cart
    clearCart(state) {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
