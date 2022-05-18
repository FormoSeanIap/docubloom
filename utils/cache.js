import 'dotenv/config.js';
import Redis from 'ioredis';

const {
  NODE_ENV, CACHE_HOST, CACHE_PORT, CACHE_USER, CACHE_PASSWORD,
} = process.env;

const redis = new Redis({
  host: CACHE_HOST,
  port: CACHE_PORT,
  username: CACHE_USER,
  password: CACHE_PASSWORD,
});

redis.ready = false;

redis.on('ready', () => {
  redis.ready = true;
  console.log('Redis is ready');
});

redis.on('error', () => {
  redis.ready = false;
  if (NODE_ENV === 'production') {
    console.error('Error in Redis');
  }
});

redis.on('end', () => {
  redis.ready = false;
  console.error('Redis is disconnected');
});

export default redis;
