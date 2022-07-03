import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">Product</div>
        <div className="header-block">Description</div>
        <div className="header-block">Quantity</div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem cartItem={item} key={item.id} />;
      })}
      <span className="total">Total Price : {cartTotalPrice} €</span>
    </div>
  );
};

export default Checkout;
