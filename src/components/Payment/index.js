import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { getBasketTotal } from '../../reducers/reducer';
import axios from '../../axios';
import { db } from '../../firebase';
import './Payment.css'

const Payment = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const [processing, setProcessing] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    if(!user) {
      history.push('/')
    }
  }, []);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'POST',
        // Stripe expects the total in a currencies submits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket]);

  // console.log('secret >>> ', clientSecret)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // PaymentIntent is paymnet confirmation

      db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'EMPTY_CART'
      })

      history.replace('/orders')
    })
  }

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '')
  }

  return (
    <div className="payment">
      <div className="payment_contianer">
        <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 REact Lane</p>
            <p>Los Angeles</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item, i) => (
              <CheckoutProduct 
                key={i}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                iratingd={item.rating}
                />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_detail">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>
                        Order Total: {value}
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button type="submit" disabled={processing || disabled || succeeded}>
                  {processing ? <p>Processing</p> : 'Buy Now'}
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
