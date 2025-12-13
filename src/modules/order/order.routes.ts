import { FastifyInstance } from "fastify";
import { executeOrder } from "./order.controller";
import { registerSocket, pushOrderUpdate } from "../../websocket/ws.manager";
import { OrderStatus } from "./order.types";

export async function orderRoutes(app: FastifyInstance) {
  app.post("/api/orders/execute", async (req, reply) => {
    const orderId = await executeOrder(req.body);
    reply.send({ orderId });
  });
  // order.routes.ts
app.get("/ws/orders/:orderId", { websocket: true }, (conn, req) => {
  const { orderId } = req.params as any;
  registerSocket(orderId, conn); // conn is a SocketStream
  pushOrderUpdate(orderId, { status: OrderStatus.PENDING }); // Calls pushOrderUpdate immediately
});
}
