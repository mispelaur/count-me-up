function sortCountDesc (count) {
  const countArr = Object.keys(count).map(key => {
    const newObj = {}
    newObj[key] = count[key]
    return newObj
  })
  return countArr.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
}

module.exports = sortCountDesc