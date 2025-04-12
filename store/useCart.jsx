import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      // Cart items array
      items: [],

      // Total number of items in cart
      totalItems: 0,

      // Total price of all items
      totalPrice: 0,

      // Add item to cart
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(item => item._id === product._id);

        if (existingItem) {
          // If item exists, increase quantity
          const updatedItems = items.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.amount
          }));
        } else {
          // If item doesn't exist, add new item
          const newItem = {
            ...product,
            quantity: 1
          };
          set((state) => ({
            items: [...state.items, newItem],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.amount
          }));
        }
      },

      // Remove item from cart
      removeItem: (productId) => {
        const items = get().items;
        const itemToRemove = items.find(item => item._id === productId);

        if (itemToRemove) {
          set((state) => ({
            items: state.items.filter(item => item._id !== productId),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.amount * itemToRemove.quantity)
          }));
        }
      },

      // Update item quantity
      updateQuantity: (productId, newQuantity) => {
        const items = get().items;
        const item = items.find(item => item._id === productId);

        if (item && newQuantity >= 0) {
          const quantityDifference = newQuantity - item.quantity;
          const updatedItems = items.map(item =>
            item._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + quantityDifference,
            totalPrice: state.totalPrice + (item.amount * quantityDifference)
          }));
        }
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      },

      // Get cart total
      getTotal: () => {
        return get().totalPrice;
      },

      // Check if product exists in cart
      isInCart: (productId) => {
        return get().items.some(item => item._id === productId);
      }
    }),
    {
      name: "shopping-cart", // name for localStorage
      skipHydration: true, // prevents hydration issues with Next.js
    }
  )
);

export default useCart;