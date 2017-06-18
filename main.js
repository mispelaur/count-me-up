const count = {}
const userVoteCount = {}
const app = require('./createServer')(count, userVoteCount)
const port = process.env.PORT || 8080
app.listen(port)
console.log(`Listening on port ${port}`)