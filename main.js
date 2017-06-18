const count = {}
const userVoteCount = {}
const app = require('./createServer')(count, userVoteCount)
const port = process.env.PORT || 8081
app.listen(port)
console.log(`Listening on port ${port}`)