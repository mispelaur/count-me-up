const poll = require('../src/poll')
const expect = require('chai').expect

describe('tally of votes', function () { 
  const cases = [
    {
      name: 'for first vote',
      initialCountObj: {},
      contestantName: 'a',
      numberOfVotes: 1,
      finalCountObj: {'a': 1}
    },
    {
      name: 'for subsequent votes',
      initialCountObj: {'a': 1},
      contestantName: 'a',
      numberOfVotes: 5,
      finalCountObj: {'a': 6}
    }
  ]

  cases.forEach(function (c) {
    describe(c.name, function () {
      it('is correct', function () {
        const count = c.initialCountObj
        for (let i = 0; i < c.numberOfVotes; i++) {
          poll.vote(c.contestantName, count)
        }
        expect(count).to.deep.equal(c.finalCountObj)
      })
    })
  })
})

describe('tally of user vote counts', function () { 
  const cases = [
    {
      name: 'for first time voter',
      initialUserVoteCountObj: {},
      userID: '123',
      numberOfVotes: 1,
      finalUserVoteCountObj: {'123': 1}
    },
    {
      name: 'for subsequent votes',
      initialUserVoteCountObj: {'123': 1},
      userID: '123',
      numberOfVotes: 5,
      finalUserVoteCountObj: {'123': 6}
    }
  ]

  cases.forEach(function (c) {
    describe(c.name, function () {
      it('is correct', function () {
        const userVoteCount = c.initialUserVoteCountObj
        for (let i = 0; i < c.numberOfVotes; i++) {
          poll.updateUserCount(c.userID, userVoteCount)
        }
        expect(userVoteCount).to.deep.equal(c.finalUserVoteCountObj)
      })
    })
  })
})

describe('user can vote', function () { 
  const cases = [
    {
      name: `if they've never voted before`,
      UserVoteCountObj: {},
      userID: '123',
      canVote: true
    },
    {
      name: `if they've voted less than ${poll.NUMBER_VOTES_PERMITTED_PER_USER} times`,
      UserVoteCountObj: {'123': `${poll.NUMBER_VOTES_PERMITTED_PER_USER - 1}`},
      userID: '123',
      canVote: true
    },
    {
      name: `but NOT if they've already voted ${poll.NUMBER_VOTES_PERMITTED_PER_USER} times`,
      UserVoteCountObj: {'123': `${poll.NUMBER_VOTES_PERMITTED_PER_USER}`},
      userID: '123',
      canVote: false
    }
  ]

  cases.forEach(function (c) {
    describe(c.name, function () {
      it('is true', function () {
        const canVote = poll.canVote(c.userID, c.UserVoteCountObj)
        expect(canVote).to.deep.equal(c.canVote)
      })
    })
  })
})