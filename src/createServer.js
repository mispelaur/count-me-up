const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const poll = require('./poll')
const getPoll = require('../handlers/getPoll')
const createVote = require('../handlers/createVote')

function createServer (count, userVoteCount) {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))

  // returns result for all contestants sorted in descending order of number of votes
  app.get('/poll', getPoll(count))

  // register a vote for a candidate only if user hasn't already voted 3 times
  app.post('/poll/contestants/:contestant', createVote(poll, count, userVoteCount))

  return app
}

module.exports = createServer