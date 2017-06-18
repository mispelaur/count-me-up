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
