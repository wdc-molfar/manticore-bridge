const { search, searchUseClient} = require('./src/api')
const api = require("./src/manti")()

module.exports = {
    search,
    searchUseClient,
    api
}