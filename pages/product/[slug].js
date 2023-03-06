import React, { useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import { Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { qty, decQty, incQty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    // Go straight to cart
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      {/* PRODUCT IMAGES */}
      <div className="product-detail-container">
        <div>
          {/* MAIN IMAGE DISPLAY */}
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          {/* MINI IMAGES CAROUSEL */}
          <div className="small-images-container">
            {image?.map((d, i) => (
              <img
                key={i}
                src={urlFor(d)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DESCRIPTION */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* MAY ALSO LIKE SECTION */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  // give me all the products, but only return the current slug properties
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // NOTE: slug is dynamic, which means we will have access to whatever slug represents
  // product
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);
  // console.log(product);
  // all products
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);
  // console.log('products: ', products);

  return {
    props: { product, products },
  };
};
