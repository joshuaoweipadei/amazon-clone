const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe_secret_key = functions.config().stripe.secret_key
const stripe = require('stripe')(`${stripe_secret_key}`)

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get('/', (req, res) => res.status(200).send('Heollo world'));

app.post('/payment/create', async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd'
  })

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// - Listen Command
exports.api = functions.https.onRequest(app)