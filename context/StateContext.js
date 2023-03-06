import React, { createContext, useContext, useState, useEffect } from 'react';
// dependencies
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  // STATES
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct; // the product to be updated
  let index; // index of the product to be updated

  // INCREMENT CART ITEM QUANTITIES
  const decQty = () => {
    setQty((prevQty) => {
      // make change
      const newQty = prevQty - 1;
      // test / update
      if (newQty < 1) return 1;
      return newQty;
    });
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // ON ADD HANDLER
  const onAdd = (product, quantity) => {
    // console.log('product: ', product);
    // console.log('quantity: ', quantity);

    // check if item already in cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // IF (ITEM ALREADY IN CART) ELSE
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    // success  -  NOTE: this doesn't seem right, what if it didn't work?
    toast.success(`${qty} ${product.name} added to your cart`);
  };

  // ON REMOVE HANDLER
  const onRemove = (product) => {
    // console.log('product: ', product);
    // return
    foundProduct = cartItems.find((item) => item._id === product._id);
    // return array with product removed
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    // compare product argument with product found from cartItems array
    // console.log(foundProduct);
    // console.log('cartItems: ', cartItems);
    // console.log('newCartItems: ', newCartItems);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  // TODO: repair TUTORIAL SOLUTION
  const toggleCartItemQuantity = (id, value) => {
    // find the product w/ index, then remove from cartItems array
    // this will enable to update item of interest
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
      } else if (foundProduct.quantity === 1) {
        onRemove(foundProduct);
      }
    }
  };
  //
  // const toggleCartItemQuantity = (id, value) => {
  //   // find the product w/ index, then remove from cartItems array
  //   // this will enable to update item of interest
  //   foundProduct = cartItems.find((item) => item._id === id);
  //   index = cartItems.findIndex((item) => item._id === id);
  //   const newCartItems = cartItems.filter((item) => item._id !== id);

  //   if (value === 'inc') {
  //     setCartItems(
  //       cartItems.splice(index, 1, {
  //         ...foundProduct,
  //         quantity: foundProduct.quantity + 1,
  //       })
  //     );
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
  //     setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
  //   } else if (value === 'dec') {
  //     if (foundProduct.quantity > 1) {
  //       setCartItems(
  //         cartItems.splice(index, 1, {
  //           ...foundProduct,
  //           quantity: foundProduct.quantity - 1,
  //         })
  //       );
  //       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
  //       setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
  //     } else if (foundProduct.quantity === 1) {
  //       onRemove(foundProduct);
  //     }
  //   }
  // };
  //
  // const toggleCartItemQuantity = (id, value) => {
  //   // find the product w/ index, then remove from cartItems array
  //   // this will enable to update item of interest
  //   foundProduct = cartItems.find((item) => item._id === id);
  //   index = cartItems.findIndex((item) => item._id === id);
  //   const newCartItems = cartItems.filter((item) => item._id !== id);

  //   const updatedCartItems = newCartItems;
  //   let updatedProduct;

  //   if (value === 'inc') {
  //     updatedProduct = {
  //       ...foundProduct,
  //       quantity: foundProduct.quantity + 1,
  //     };
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + updatedProduct.price);
  //     setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
  //   } else if (value === 'dec') {
  //     if (foundProduct.quantity > 1) {
  //       updatedProduct = {
  //         ...foundProduct,
  //         quantity: foundProduct.quantity - 1,
  //       };
  //       setTotalPrice(
  //         (prevTotalPrice) => prevTotalPrice - updatedProduct.price
  //       );
  //       setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
  //     }
  //     else if (foundProduct.quantity === 1) {
  //       onRemove(foundProduct);
  //     }
  //   }
  //   newCartItems.splice(index, 0, updatedProduct);
  //   setCartItems(newCartItems);
  // };

  // Specify the context provider
  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        showCart,
        setShowCart,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        toggleCartItemQuantity,
        qty,
        decQty,
        incQty,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//
export const useStateContext = () => useContext(Context);
