//we are adding an index file to exports the typeDefs and resolvers
//so that we can import them into our server.js file
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };