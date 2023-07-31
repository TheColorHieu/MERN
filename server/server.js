const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//here we are adding the ApolloServer to our server
const { ApolloServer } = require('apollo-server-express');
//importing our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
//importing our auth middleware function
const { authMiddleware } = require('./utils/auth');

//create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//integrate our Apollo server with the Express application as middleware

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
startApolloServer(typeDefs, resolvers);
