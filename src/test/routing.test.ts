import { routeOrder } from '../dex/dex.router';

describe('DEX Routing', () => {
  test('returns best DEX', async () => {
    const result = await routeOrder('SOL', 'USDC', 1);
    expect(['raydium', 'meteora']).toContain(result.bestDex);
    expect(result.bestPrice).toBeGreaterThan(0);
  });

  test('throws error sometimes (mock failure)', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    await expect(
      routeOrder('SOL', 'USDC', 1)
    ).rejects.toThrow();
    jest.restoreAllMocks();
  });
});
