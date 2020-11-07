import React from 'react'
import SubTotal from '../Layouts/Subtotal'
import { useStateValue } from '../Context/StateProvider'

import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="checkout_ad" />

        <div>
          {user ? <h3>Hello, {user?.email}</h3> : null }
          <h2 className="checkout_title">Your Shopping Basket</h2>
            {basket.map(item => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
        </div>
      </div>

      <div className="checkout_right">
        <SubTotal />
      </div>
    </div>
  )
}

export default Checkout
