const functional = require('../src/functional');

function wait (ms) {
  return new Promise((res) => {
    setTimeout(res, ms)
  })
}

test('debounce should right', async () => {
  let counter = 0;
  const debounced = functional.debounce(function () {
    counter++
  }, 64);

  debounced();
  debounced();
  await wait(32);
  debounced();
  await wait(64);
  debounced();
  await wait(64);

  expect(counter).toEqual(2);
});

test('throttle should right', async () => {
  let counter = 0;
  const throttled = functional.throttle(function () {
    counter++
  }, 64);

  throttled();
  throttled();
  expect(counter).toEqual(1);

  await wait(64);
  expect(counter).toEqual(2);
});
