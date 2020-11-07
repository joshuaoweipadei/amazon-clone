import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import { AiFillStar } from 'react-icons/ai'

import './CheckoutProduct.css'

const CheckoutProduct = ({ id, img, title, price, rating, hiddenButton }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id
    })
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={img} alt="product_img" />

      <div className="checkProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkboxProduct_rating">
          {Array(rating).fill().map((_, i) => (
            <AiFillStar key={i} className="star" />
          ))}
        </div>
        {!hiddenButton && (
          <button onClick={() => removeFromBasket(id)}>Remove from basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
