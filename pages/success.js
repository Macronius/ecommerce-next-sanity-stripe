// library & framework
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
//
import { useStateContext } from '../context/StateContext';
import { BsBagCheckFill } from 'react-icons/bs';
import { runConfettiFireworks } from '../lib/utils';

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // reset everything
    localStorage.clear();
    runConfettiFireworks();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for your receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:customerservice@comtrya.com">
            Comtrya - Customer Service
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
