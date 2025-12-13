import { orderQueue } from '../modules/order/order.queue';

describe('Order Queue', () => {
  test('adds job with retries', async () => {
    const job = await orderQueue.add('execute', {
      id: 'test',
      tokenIn: 'SOL',
      tokenOut: 'USDC',
      amount: 1,
    }, {
      attempts: 3,
    });

    expect(job.opts.attempts).toBe(3);
  });
});
