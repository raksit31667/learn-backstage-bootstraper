import { fizzbuzzPlugin } from './plugin';

describe('fizzbuzz', () => {
  it('should export plugin', () => {
    expect(fizzbuzzPlugin).toBeDefined();
  });
});
