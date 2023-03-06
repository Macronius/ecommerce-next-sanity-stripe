import React from 'react';
// framework
import Link from 'next/link';
// components
import { Cart } from './';
// dependencies
import { AiOutlineShopping } from 'react-icons/ai';
// context state
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  // CONTEXT STATE
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Comtrya Commerce</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
