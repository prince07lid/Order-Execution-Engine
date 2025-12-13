export async function getMeteoraQuote(
  tokenIn: string,
  tokenOut: string,
  amount: number
) {
  await sleep(300);

  const price = 100 * (0.97 + Math.random() * 0.05);
  return {
    dex: 'meteora',
    price,
    fee: 0.002,
  };
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
