// tests/async.test.js
const assert = require('assert');

describe('Async Functions', () => {
  it('should resolve with 3 when adding 1 and 2', async () => {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve(1 + 2), 100);
    });
    assert.strictEqual(result, 3);
  });

  it('should resolve with 5 when adding 2 and 3', async () => {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve(2 + 3), 100);
    });
    assert.strictEqual(result, 5);
  });
});
