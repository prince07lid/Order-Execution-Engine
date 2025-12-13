import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { orderRoutes } from './modules/order/order.routes';

export const app = Fastify({ logger: true });


app.register(websocket);
app.get("/", async () => {
  return { status: "ok" };
});
app.register(orderRoutes);

// legacy health endpoint
app.get("/health", async () => {
  return { status: "ok" };
});
