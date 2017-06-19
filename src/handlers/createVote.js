function createVote (poll, count, userVoteCount) {
  return (req, res) => {
    const userID = req.get('x-user-id')
    if (userID && poll.canVote(userID, userVoteCount)) { // vote and return 201
      poll.updateUserCount(userID, userVoteCount)
      poll.vote(req.params['contestant'], count)
      res.status(201)
    } else { // no vote return 403
      res.status(403)
    }
    res.json(count)
  }
}

module.exports = createVote
