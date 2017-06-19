const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const should = chai.should()
const sortCountDesc = require('../src/sortCountDesc')

chai.use(chaiHttp)

describe('GET /poll', () => {
  it('it should output the number of votes per contestant in descending order', (done) => {
    const initialCount = {
      'a': 8000000,
      'b': 2000000,
      'c': 6000000,
      'd': 4000000
    }
    const app = require('../src/createServer')(initialCount, {})
    const sorted = sortCountDesc(initialCount)
    chai.request(app)
      .get('/poll')
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body).to.deep.equal(sorted)
        done()
      })
  })
})

describe('POST /poll/contestants/:contestant', () => {
  const cases = [
    {
      name: 'first-time-voter',
      count: {},
      userVoteCount: {},
      userID: '123',
      contestant: 'a',
      expectedStatus: 201,
      expectedResponse: {'a': 1}
    },
    {
      name: 'second-time-voter',
      count: {'a': 1},
      userVoteCount: {'123': 1},
      userID: '123',
      contestant: 'a',
      expectedStatus: 201,
      expectedResponse: {'a': 2}
    },
    {
      name: 'fourth-time-voter',
      count: {'a': 1, 'b': 2},
      userVoteCount: {'123': 3},
      userID: '123',
      contestant: 'c',
      expectedStatus: 403,
      expectedResponse: {'a': 1, 'b': 2}
    }
  ]

  cases.forEach(c => {
    describe(c.name, () => {
      it('is correct', done => {
        const app = require('../src/createServer')(c.count, c.userVoteCount)
        chai.request(app)
          .post(`/poll/contestants/${c.contestant}`)
          .set('x-user-id', c.userID)
          .end((err, res) => {
            res.should.have.status(c.expectedStatus)
            expect(res.body).to.deep.equal(c.expectedResponse)
            done()
          })
      })
    })
  })
})
