const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(morgan('dev'))

const port = process.env.PORT || 8080

const poll = {
  count: {},
  userVoteCount: {}
}

const numberVotesPermittedPerUser = 3

function initializeCount () {
  poll.count['a'] = 8000000
  poll.count['b'] = 2000000
  poll.count['c'] = 6000000
  poll.count['d'] = 4000000
}

function canVote (userID) {
  const numberVotesByUser = poll.userVoteCount[userID]
  return !numberVotesByUser || numberVotesByUser < numberVotesPermittedPerUser
}

function updateUserCount (userID) {
  if (poll.userVoteCount[userID]) {
    poll.userVoteCount[userID]++
  } else {
    poll.userVoteCount[userID] = 1
  }
}

function vote (contestant) {
  if (poll.count[contestant]) {
    poll.count[contestant]++
  } else {
    poll.count[contestant] = 1
  }
}

function sortCountDesc (count) {
  const countArr = Object.keys(count).map(key => {
    const newObj = {}
    newObj[key] = count[key]
    return newObj
  })
  return countArr.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}

const router = express.Router()

// returns result for all contestants sorted in descending order of number of votes
router.get('/', (req, res) => { 
  const sortedContestants = sortCountDesc(poll.count)
  res.json(sortedContestants)
})


router.post('/candidates/:candidate', (req, res) => {
  const userID = req.get('x-user-id')
  if (userID && canVote(userID)) { // vote and return 201
    updateUserCount(userID)
    vote(req.params['candidate'])
    res.status(201)
  } else { // no vote return 403
    res.status(403)
  }
  res.json(poll)
})

app.use('/poll', router)

app.listen(port)
initializeCount()
console.log(`Listening on port ${port}`)
