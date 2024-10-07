// math.test.js
const assert = require('assert');

function runTests() {
  assert.strictEqual(5 + 3, 8)
  // assert.strictEqual(3 + 2, 10)
  assert.notEqual(2 + 3, 10)
}
function run2() {
  assert.notEqual(10, 20)
}

// Run the tests
runTests();
run2()
