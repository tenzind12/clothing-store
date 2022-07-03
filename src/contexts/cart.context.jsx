import { createContext, useState } from 'react';

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
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // add item to cart dropdown
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
