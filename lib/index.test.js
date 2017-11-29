const add = require('./index')

test('a + b', () => {
  expect(add(1, 1)).toEqual(2)
})
