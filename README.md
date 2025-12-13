

# 🧠 Order Execution Engine (Mock DEX Routing)

A backend **order execution engine** that processes **market orders** with **DEX routing**, **queue-based concurrency**, **retry logic**, **real-time WebSocket updates**, and **persistent order history**.

Built for **Backend Task 2 – Order Execution Engine**.

---

## ✨ Features

* ✅ Market order execution
* ✅ DEX routing between **Raydium** and **Meteora** (mocked)
* ✅ Best-price selection
* ✅ BullMQ + Redis queue (concurrent processing)
* ✅ Retry with exponential backoff (≤ 3 attempts)
* ✅ Real-time order lifecycle via WebSocket
* ✅ PostgreSQL persistence (final order state)
* ✅ Unit & integration tests

---

## 🔄 Order Lifecycle

```
pending → routing → building → submitted → confirmed
                         ↘ failed (after retries)
```

Each stage is:

* Logged on the server
* Streamed live to clients via WebSocket

---

## 🛠 Tech Stack

* **Node.js + TypeScript**
* **Fastify** (HTTP + WebSocket)
* **BullMQ + Redis** (queue & concurrency)
* **PostgreSQL** (order history)
* **Jest** (testing)

---

## 📁 Project Structure

```
src/
├── app.ts
├── server.ts
├── index.ts
├── config/
│   ├── redis.ts
│   └── postgres.ts
├── modules/order/
│   ├── order.routes.ts
│   ├── order.controller.ts
│   ├── order.queue.ts
│   ├── order.worker.ts
│   └── order.types.ts
├── dex/
│   ├── dex.router.ts
│   ├── raydium.mock.ts
│   └── meteora.mock.ts
├── websocket/ws.manager.ts
├── db/order.repo.ts
└── tests/
```

---

## 🚀 Setup & Run

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Redis Setup (Local – No Docker)

This project uses a **locally running Redis server**.

Start Redis:

```bash
redis-server
```

Verify Redis:

```bash
redis-cli ping
# Expected output: PONG
```

---

### 3️⃣ PostgreSQL Setup

Create database:

```sql
CREATE DATABASE orders_db;
```

Create table:

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  token_in TEXT,
  token_out TEXT,
  amount NUMERIC,
  status TEXT,
  dex TEXT,
  executed_price NUMERIC,
  tx_hash TEXT,
  error TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

---

### 4️⃣ Run server

```bash
npm run dev
```

Health check:

```
GET http://localhost:3000/health
```

---

## 🔌 API Usage

### Create Order (HTTP)

```
POST /api/orders/execute
```

Request body:

```json
{
  "tokenIn": "SOL",
  "tokenOut": "USDC",
  "amount": 1
}
```

Response:

```json
{
  "orderId": "uuid"
}
```

---

### WebSocket – Live Updates

```
ws://localhost:3000/ws/orders/{orderId}
```

Example messages:

```json
{ "status": "routing" }
{ "status": "building", "dex": "meteora" }
{ "status": "submitted" }
{ "status": "confirmed", "txHash": "0xabc..." }
```

---

## 🔁 Retry Logic

* Maximum **3 attempts**
* **Exponential backoff** (1s → 2s → 4s)
* Final failure emits:

```json
{ "status": "failed", "error": "DEX routing failed" }
```

---

## 🧪 Tests

Run:

```bash
npm run test
```

Test coverage includes:

* DEX routing logic
* Queue configuration & retries
* WebSocket connectivity

---

## 📌 Design Decisions

### Why Market Orders?

* Immediate execution
* Minimal edge cases
* Simplest to demonstrate routing & lifecycle

### Extending to Other Order Types

* **Limit Orders**: Add price checks before execution
* **Sniper Orders**: Trigger execution based on on-chain or event signals

### Why Mock DEXs?

* Focus on **architecture & flow**
* Deterministic demos
* Real SDKs can replace mocks with minimal changes

### Redis Choice

Redis is run locally using `redis-server`.
Docker is optional and not required for this setup.

Deploy--https://order-execution-engine.onrender.com

