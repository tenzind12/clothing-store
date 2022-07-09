import { createContext, useReducer } from 'react';

// =============== HELPER FUNCTIONS =============== //

//  ***========= ADD ITEM TO CART ========*** //
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

// ***======== REMOVE ITEM FROM THE CART  ========*** //
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

// ***======== CLEAR ITEM FROM CHECKOUT PAGE  ========*** //
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

// *********REDUCER************//

const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        // isCartOpen: !state.isCartOpen,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// *********END_OF_REDUCER************//

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotalPrice } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, currItem) => total + currItem.quantity, 0);
    const newCartTotalPrice = newCartItems.reduce(
      (total, currItem) => total + currItem.quantity * currItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPE.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotalPrice: newCartTotalPrice,
      },
    });
  };

  // add item to cart dropdown
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  // remove item to cart dropdown
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  // clear item from checkout
  const clearItemFromCart = (itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    updateCartItemsReducer(newCartItems);
  };

  // open / close cart dropdown
  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: bool });
  };

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
