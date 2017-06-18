const numberVotesPermittedPerUser = 3

function canVote (userID, userVoteCount) {
  const numberVotesByUser = userVoteCount[userID]
  return !numberVotesByUser || numberVotesByUser < numberVotesPermittedPerUser
}

function updateUserCount (userID, userVoteCount) {
  if (userVoteCount[userID]) {
    userVoteCount[userID]++
  } else {
    userVoteCount[userID] = 1
  }
}

function vote (contestant, count) {
  if (count[contestant]) {
    count[contestant]++
  } else {
    count[contestant] = 1
  }
}

module.exports = {
  canVote: canVote,
  updateUserCount: updateUserCount,
  vote: vote,
  numberVotesPermittedPerUser: numberVotesPermittedPerUser
}