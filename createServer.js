const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const poll = require('./poll')
const sortCountDesc = require('./sortCountDesc')

function createServer (count, userVoteCount) {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))

  // returns result for all contestants sorted in descending order of number of votes
  app.get('/poll', (req, res) => { 
    const sortedContestants = sortCountDesc(count)
    res.json(sortedContestants)
  })

  // register a vote for a candidate only if user hasn't already voted 3 times
  app.post('/poll/contestants/:contestant', (req, res) => {
    const userID = req.get('x-user-id')
    if (userID && poll.canVote(userID, userVoteCount)) { // vote and return 201
      poll.updateUserCount(userID, userVoteCount)
      poll.vote(req.params['contestant'], count)
      res.status(201)
    } else { // no vote return 403
      res.status(403)
    }
    res.json(count)
  })

  return app
}

module.exports = createServer