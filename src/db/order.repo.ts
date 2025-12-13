import { pgPool } from '../config/postgres';
import { Order } from '../modules/order/order.types';

export async function saveOrder(
  order: Order & {
    dex?: string;
    executedPrice?: number;
    txHash?: string;
    error?: string;
  }
) {
  await pgPool.query(
    `INSERT INTO orders
     (id, token_in, token_out, amount, status, dex, executed_price, tx_hash, error)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      order.id,
      order.tokenIn,
      order.tokenOut,
      order.amount,
      order.status,
      order.dex ?? null,
      order.executedPrice ?? null,
      order.txHash ?? null,
      order.error ?? null,
    ]
  );
}
