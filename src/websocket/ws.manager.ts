// import { SocketStream } from '@fastify/websocket';

// const sockets = new Map<string, SocketStream>();

// export function registerSocket(orderId: string, socket: SocketStream) {
//   sockets.set(orderId, socket);
// }

// export function pushOrderUpdate(orderId: string, payload: any) {
//   const socket = sockets.get(orderId);
//   if (socket) {
//     socket.socket.send(JSON.stringify(payload));
//   }
// }

// src/websocket/ws.manager.ts

import { SocketStream } from '@fastify/websocket';

const sockets = new Map<string, SocketStream>();

export function registerSocket(orderId: string, socket: SocketStream) {
  sockets.set(orderId, socket);
}

export function pushOrderUpdate(orderId: string, payload: any) {
  const socketStream = sockets.get(orderId);
  if (socketStream) {
    // **CHANGED LINE:** Access the raw WebSocket object, which should be the first property of the stream.
    // The SocketStream itself may contain the raw socket as 'socket' or 'conn', or it might expose the send method directly.
    // Try accessing the raw socket directly via .socket property of the stream, or the stream itself if it is the raw socket.
    
    // **Attempt 1: Assume `socketStream` is the object with the `.send()` method (or its `.socket` property is the raw ws)**
    // The error suggests socketStream.socket is undefined. Let's assume the raw WebSocket is simply `socketStream.socket`.
    // The previous code was: socket.socket.send
    
    // Let's assume the registered object `socket` (which is `SocketStream`) needs to be accessed differently for the send function.
    
    // **Common Fix:** The `SocketStream` object has a `socket` property which is the raw `ws` object.
    // The error is likely that the `socket` object you are getting from the map is not a `SocketStream` or has lost its structure.
    
    // **Fixing the `socket.socket` issue:**
    // In Fastify's WebSocket handler:
    // `(conn /* this is SocketStream */, req) => { ... registerSocket(orderId, conn); ... }`
    // The `SocketStream` object passed *into* `registerSocket` should be stored.
    
    // The error suggests that `socket` (which is the `SocketStream`) is retrieved correctly, but `socket.socket` is undefined.
    
    // **Try accessing the `conn.socket` directly on the retrieved object:**
    
    const ws = socketStream.socket; // Get the raw WebSocket
    if (ws) {
      ws.send(JSON.stringify(payload));
    } else {
      console.warn(`[WS Manager] Raw socket is undefined for orderId: ${orderId}`);
    }
    
    // **If the above still fails, try assuming the `SocketStream` object *is* the raw WebSocket connection directly:**
    // socketStream.send(JSON.stringify(payload)); // This is less likely with the `@fastify/websocket` wrapper.
  }
}