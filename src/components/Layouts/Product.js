import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import { AiFillStar } from 'react-icons/ai'

import './Product.css'

const Product = ({ id, title, img, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        img: img,
        price: price,
        rating: rating
      }
    })
  }

  return (
    <div className="product">
      <div className="product_container">
        <div className="product_info">
          <p>{title}</p>
          <p className="product_price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product_rating">
            {Array(rating).fill().map((_, i) => (
              <AiFillStar key={i} className="star" />
            ))}
          </div>
        </div>

        <img src={img} alt="product" />

        <button onClick={addToBasket}>Add to Basket</button>
      </div>
    </div>
  )
}

export default Product;
