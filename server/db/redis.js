const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

const getSet = promisify(redisClient.smembers).bind(redisClient);
const getSortedSet = promisify(redisClient.zrangebyscore).bind(redisClient);
const get = promisify(redisClient.get).bind(redisClient);

module.exports = {
  redisClient, getSet, get, getSortedSet,
};
