import { createContext, useEffect, useState } from 'react';

// =============== HELPER FUNCTIONS =============== //
// Add item to cart
const addCartItem = (cartItems, productToAdd) => {
  // .find(returns the value of the first element that passes a test)
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Remove item from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
  // .find(returns the value of the first element that passes a test)
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

  // if quantity is 1, remove item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

// clear item from checkout page
const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter((item) => item.id !== itemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  // add item to cart dropdown
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // remove item to cart dropdown
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // clear item from checkout
  const clearItemFromCart = (itemToClear) => setCartItems(clearCartItem(cartItems, itemToClear));

  // Counting total quantity in cart
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, currItem) => total + currItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  // Cart Total Price
  useEffect(() => {
    const newCartTotalPrice = cartItems.reduce(
      (total, currItem) => total + currItem.quantity * currItem.price,
      0
    );

    setCartTotalPrice(newCartTotalPrice);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
