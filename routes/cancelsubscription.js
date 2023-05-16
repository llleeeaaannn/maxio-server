import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const cancelSubscription = async function (req, res, next) {
  try {

    const { subscriptionId } = req.body;
    const response = await fetch(`https:///frank-test.chargify.com/subscriptions/${subscriptionId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Q0tDZW5YMHBoOWx1WGh3WUUxVVFOalphQXdLWTVYWkJjZW9nY3pkb2ZjOng=',
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
