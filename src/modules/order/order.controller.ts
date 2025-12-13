import { orderQueue } from './order.queue';
import { Order, OrderStatus } from './order.types';
import { randomUUID } from 'crypto';
import { pushOrderUpdate } from '../../websocket/ws.manager';

export async function executeOrder(data: any) {
  const order: Order = {
    id: randomUUID(),
    tokenIn: data.tokenIn,
    tokenOut: data.tokenOut,
    amount: data.amount,
    status: OrderStatus.PENDING,
  };

//   await orderQueue.add('execute', order);
await orderQueue.add('execute', order, {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
});


  pushOrderUpdate(order.id, { status: OrderStatus.PENDING });

  return order.id;
}
