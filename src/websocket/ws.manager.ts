
import WebSocket from 'ws';

const sockets = new Map<string, WebSocket>();

export function registerSocket(orderId: string, socket: WebSocket) {
  sockets.set(orderId, socket);
}

export function pushOrderUpdate(orderId: string, payload: any) {
  const ws = sockets.get(orderId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}
