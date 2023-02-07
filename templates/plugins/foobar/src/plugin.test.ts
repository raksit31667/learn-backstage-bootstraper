import { foobarPlugin } from './plugin';

describe('foobar', () => {
  it('should export plugin', () => {
    expect(foobarPlugin).toBeDefined();
  });
});
