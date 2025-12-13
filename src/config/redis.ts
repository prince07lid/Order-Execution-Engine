import { Redis } from 'ioredis';
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const redisConnection = new Redis(redisUrl, {
  maxRetriesPerRequest: null, 
  host: '127.0.0.1', 
  port: 6379,
});
// import { Redis } from 'ioredis';

// export const redisConnection = new Redis({
//   maxRetriesPerRequest:null,  
//   host: '127.0.0.1',
//   port: 6379,
// });
