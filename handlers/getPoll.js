const sortCountDesc = require('../src/sortCountDesc')

function getPoll (count) {
  return (req, res) => {
    const sortedContestants = sortCountDesc(count)
    res.json(sortedContestants)
  }
}

module.exports = getPoll