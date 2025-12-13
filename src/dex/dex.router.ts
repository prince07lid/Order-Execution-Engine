import { getRaydiumQuote } from './raydium.mock';
import { getMeteoraQuote } from './meteora.mock';

export async function routeOrder(
  tokenIn: string,
  tokenOut: string,
  amount: number
) {
  // **Simulated Failure Logic**
  if (Math.random() < 0.2) {
    throw new Error('DEX quote failed');
  }
  // **End Simulated Failure Logic**

  const [raydium, meteora] = await Promise.all([
    getRaydiumQuote(tokenIn, tokenOut, amount),
    getMeteoraQuote(tokenIn, tokenOut, amount),
  ]);

  const best =
    raydium.price >= meteora.price ? raydium : meteora;

  return {
    bestDex: best.dex,
    bestPrice: best.price,
    allQuotes: { raydium, meteora },
  };
}
// import { getRaydiumQuote } from './raydium.mock';
// import { getMeteoraQuote } from './meteora.mock';

// export async function routeOrder(
//   tokenIn: string,
//   tokenOut: string,
//   amount: number
// ) {
//   const [raydium, meteora] = await Promise.all([
//     getRaydiumQuote(tokenIn, tokenOut, amount),
//     getMeteoraQuote(tokenIn, tokenOut, amount),
//   ]);

//   const best =
//     raydium.price >= meteora.price ? raydium : meteora;

//   return {
//     bestDex: best.dex,
//     bestPrice: best.price,
//     allQuotes: { raydium, meteora },
//   };
// }
