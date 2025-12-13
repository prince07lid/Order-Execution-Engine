export async function getRaydiumQuote(
  tokenIn: string,
  tokenOut: string,
  amount: number
) {
  await sleep(300);

  const price = 100 * (0.98 + Math.random() * 0.04); // mock price
  return {
    dex: 'raydium',
    price,
    fee: 0.003,
  };
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
