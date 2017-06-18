const sortCountDesc = require('../sortCountDesc')

function getPoll (count) {
  return (req, res) => {
    const sortedContestants = sortCountDesc(count)
    res.json(sortedContestants)
  }
}

module.exports = getPoll