import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const apiKey = process.env.CHARGIFY_API_KEY;

const cancelSubscription = async function (req, res, next) {
  try {

    const { subscriptionId } = req.body;
    const response = await fetch(`https:///frank-test.chargify.com/subscriptions/${subscriptionId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
    }

    req.subscriptionResponse = {
      status: 200,
      message: 'Subscription canceled successfully',
    };

    next();
  } catch (error) {
    next(error);
  }
};

router
  .route('/')
  .delete([cancelSubscription], function (req, res) {
    res.status(req.subscriptionResponse.status).json(req.subscriptionResponse);
  });

export default router;
