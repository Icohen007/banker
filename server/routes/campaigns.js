const express = require('express');
const { getSet } = require('../db/redis');

const router = express.Router();
const campaignsKey = 'LIST_OF_CAMPAIGNS';

router.get('/', async (req, res) => {
  try {
    const campaigns = await getSet(campaignsKey);
    res.status(200).send(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
