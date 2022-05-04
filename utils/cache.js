import 'dotenv/config';
import Redis from 'ioredis';

const { CACHE_HOST, CACHE_PORT, CACHE_USER, CACHE_PASSWORD } = process.env;

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
    console.error('Error in Redis');
});

redis.on('end', () => {
    redis.ready = false;
    console.error('Redis is disconnected');
});

export default redis;