const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const poll = require('./poll')
const count = {}
const userVoteCount = {}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

const port = process.env.PORT || 8080
const router = express.Router()

function sortCountDesc (count) {
  const countArr = Object.keys(count).map(key => {
    const newObj = {}
    newObj[key] = count[key]
    return newObj
  })
  return countArr.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}

// returns result for all contestants sorted in descending order of number of votes
router.get('/', (req, res) => { 
  const sortedContestants = sortCountDesc(poll.count)
  res.json(sortedContestants)
})

// register a vote for a candidate only if user hasn't already voted 3 times
router.post('/contestants/:contestant', (req, res) => {
  const userID = req.get('x-user-id')
  if (userID && poll.canVote(userID), userVoteCount) { // vote and return 201
    poll.updateUserCount(userID, userVoteCount)
    poll.vote(req.params['contestant'], count)
    res.status(201)
  } else { // no vote return 403
    res.status(403)
  }
  res.json(poll)
})

app.use('/poll', router)

app.listen(port)
console.log(`Listening on port ${port}`)