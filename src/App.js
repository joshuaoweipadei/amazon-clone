import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout'
import Login from './components/Login';

import { auth } from './firebase'

import './App.css';
import { useStateValue } from './components/Context/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

const promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)

function App() {
  const [state, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
      
    })
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
