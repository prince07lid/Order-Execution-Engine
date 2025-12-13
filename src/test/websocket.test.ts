import WebSocket from 'ws';

describe('WebSocket lifecycle', () => {
  test('connects successfully', (done) => {
    const ws = new WebSocket(
      'ws://localhost:3000/ws/orders/test-order'
    );

    ws.on('open', () => {
      ws.close();
      done();
    });
  });
});
