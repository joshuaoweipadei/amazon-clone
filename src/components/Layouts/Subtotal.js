import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'
import { getBasketTotal } from '../../reducers/reducer'
import { useHistory } from 'react-router-dom'

const SubTotal = () => {
  const history = useHistory()
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} Items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push('/payment')}>Process to Checkout</button>
    </div>
  )
}

export default SubTotal
