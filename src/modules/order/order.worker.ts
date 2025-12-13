if ((global as any).__orderWorkerStarted) {
  console.log('Worker already running');
  process.exit(0);
}
(global as any).__orderWorkerStarted = true;

import { Worker } from 'bullmq';
import { ORDER_QUEUE_NAME } from './order.queue';
import { Order, OrderStatus } from './order.types';
import { redisConnection } from '../../config/redis';
import { pushOrderUpdate } from '../../websocket/ws.manager';
import { routeOrder } from '../../dex/dex.router';
import { saveOrder } from '../../db/order.repo'; 


export const orderWorker = new Worker<Order>(
  ORDER_QUEUE_NAME,
  async (job) => {
    const order = job.data;

    console.log(`[ORDER ${order.id}] pending`);

    try {
      // routing
      console.log(`[ORDER ${order.id}] routing`);
      pushOrderUpdate(order.id, { status: OrderStatus.ROUTING });

      const routingResult = await routeOrder(
        order.tokenIn,
        order.tokenOut,
        order.amount
      );

      console.log(
        `[ORDER ${order.id}] routed to ${routingResult.bestDex} @ price ${routingResult.bestPrice}`
      );

      // building
      console.log(`[ORDER ${order.id}] building`);
      pushOrderUpdate(order.id, {
        status: OrderStatus.BUILDING,
        dex: routingResult.bestDex,
      });

      // submitted
      console.log(`[ORDER ${order.id}] submitted`);
      pushOrderUpdate(order.id, {
        status: OrderStatus.SUBMITTED,
      });

      // confirmed
      console.log(`[ORDER ${order.id}] confirmed`);
      
      const txHash = generateMockTxHash(); 
      
      pushOrderUpdate(order.id, {
        status: OrderStatus.CONFIRMED,
        dex: routingResult.bestDex,
        executedPrice: routingResult.bestPrice,
        txHash: txHash,
      });
      
      await saveOrder({
        ...order,
        status: OrderStatus.CONFIRMED,
        dex: routingResult.bestDex,
        executedPrice: routingResult.bestPrice,
        txHash: txHash,
      });

      return { success: true };
    } catch (err: any) {
      console.error(`[ORDER ${order.id}] failed`, err.message);

      // 1. Notify client via WebSocket
      pushOrderUpdate(order.id, {
        status: OrderStatus.FAILED,
        error: err.message,
      });
      
      // 2. Persist FAILED status and error to the database
      await saveOrder({
        ...order,
        status: OrderStatus.FAILED,
        error: err.message,
      });

      // 3. Re-throw to trigger BullMQ retry/failure
      throw err; 
    }
  },
  { connection: redisConnection }
);

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function generateMockTxHash() {
  return '0x' + Math.random().toString(16).slice(2);
}
// if ((global as any).__orderWorkerStarted) {
//   console.log('Worker already running');
//   process.exit(0);
// }
// (global as any).__orderWorkerStarted = true;

// import { Worker } from 'bullmq';
// import { ORDER_QUEUE_NAME } from './order.queue';
// import { Order, OrderStatus } from './order.types';
// import { redisConnection } from '../../config/redis';
// import { pushOrderUpdate } from '../../websocket/ws.manager';
// import { routeOrder } from '../../dex/dex.router';


// export const orderWorker = new Worker<Order>(
//   ORDER_QUEUE_NAME,
//   async (job) => {
//     const order = job.data;

//     console.log(`[ORDER ${order.id}] pending`);

//      // routing
//     // console.log(`[ORDER ${order.id}] routing`);
//     // pushOrderUpdate(order.id, { status: OrderStatus.ROUTING });
//     // await sleep(500);
//     // routing
// console.log(`[ORDER ${order.id}] routing`);
// pushOrderUpdate(order.id, { status: OrderStatus.ROUTING });

// const routingResult = await routeOrder(
//   order.tokenIn,
//   order.tokenOut,
//   order.amount
// );

// console.log(
//   `[ORDER ${order.id}] routed to ${routingResult.bestDex} @ price ${routingResult.bestPrice}`
// );

//     // building
// console.log(`[ORDER ${order.id}] building`);
// pushOrderUpdate(order.id, {
//   status: OrderStatus.BUILDING,
//   dex: routingResult.bestDex,
// });

// // submitted
// console.log(`[ORDER ${order.id}] submitted`);
// pushOrderUpdate(order.id, {
//   status: OrderStatus.SUBMITTED,
// });

// // confirmed
// console.log(`[ORDER ${order.id}] confirmed`);
// pushOrderUpdate(order.id, {
//   status: OrderStatus.CONFIRMED,
//   dex: routingResult.bestDex,
//   executedPrice: routingResult.bestPrice,
//   txHash: generateMockTxHash(),
// });


//     return { success: true };
//   },
//   { connection: redisConnection }
// );

// function sleep(ms: number) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// function generateMockTxHash() {
//   return '0x' + Math.random().toString(16).slice(2);
// }
