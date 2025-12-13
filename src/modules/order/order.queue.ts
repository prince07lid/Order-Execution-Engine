import { Queue } from 'bullmq';
import { redisConnection } from '../../config/redis';

export const ORDER_QUEUE_NAME = 'order-queue';

export const orderQueue = new Queue(ORDER_QUEUE_NAME, {
  connection: redisConnection,
});
