import { createContext, useEffect, useState } from 'react';

// HELPER FUNCTION
const addCartItem = (cartItems, productToAdd) => {
  // .find(returns the value of the first element that passes a test)
  const existingCartItems = cartItems.find((item) => item.id === productToAdd.id);

  // if found, increment quantity
  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // add item to cart dropdown
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // Counting total quantity in cart
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, currItem) => total + currItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
