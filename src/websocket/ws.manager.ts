// import { SocketStream } from '@fastify/websocket';

// const sockets = new Map<string, SocketStream>();

// export function registerSocket(orderId: string, socket: SocketStream) {
//   sockets.set(orderId, socket);
// }

// export function pushOrderUpdate(orderId: string, payload: any) {
//   const socketStream = sockets.get(orderId);
//   if (socketStream) {
    
//     const ws = socketStream.socket;
//     if (ws) {
//       ws.send(JSON.stringify(payload));
//     } else {
//       console.warn(`[WS Manager] Raw socket is undefined for orderId: ${orderId}`);
//     }
    
//   }
// }
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
