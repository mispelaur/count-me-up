const sortCountDesc = require('../src/sortCountDesc')
const expect = require('chai').expect

describe('sorts by descending values', function () { 
  const cases = [
    {
      name: 'empty objects',
      initialObj: {},
      sortedAsArray: []
    },
    {
      name: 'already sorted objects',
      initialObj: {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
      },
      sortedAsArray: [
        {'d': 4},
        {'c': 3},
        {'b': 2},
        {'a': 1},
      ]
    },
    {
      name: 'un-sorted objects',
      initialObj: {
        'a': 4,
        'b': 3,
        'c': 2,
        'd': 1,
      },
      sortedAsArray: [
        {'a': 4},
        {'b': 3},
        {'c': 2},
        {'d': 1},
      ]
    }
  ]

  cases.forEach(function (c) {
    describe(c.name, function () {
      it('is true', function () {
        const sorted = sortCountDesc(c.initialObj)
        expect(sorted).to.deep.equal(c.sortedAsArray)
      })
    })
  })
})
