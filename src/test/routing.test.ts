
import { routeOrder } from '../dex/dex.router';

describe('DEX Routing', () => {

  test('returns best DEX', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9); // force success

    const result = await routeOrder('SOL', 'USDC', 1);

    expect(['raydium', 'meteora']).toContain(result.bestDex);
    expect(result.bestPrice).toBeGreaterThan(0);

    jest.restoreAllMocks();
  });

  test('throws error sometimes (mock failure)', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1); // force failure

    await expect(
      routeOrder('SOL', 'USDC', 1)
    ).rejects.toThrow('DEX quote failed');

    jest.restoreAllMocks();
  });

});
