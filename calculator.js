const args = process.argv.slice(2)
const { multiplication } = require('./actions/multiplication')

console.log(Number(args[0]) + Number(args[1]))