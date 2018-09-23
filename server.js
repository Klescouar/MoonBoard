const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createWriteStream } = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const { GraphQLServer } = require('graphql-yoga');
const { apolloUploadExpress } = require('apollo-upload-server');
const graphqlHTTP = require('express-graphql');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();
// Create GraphiQL application
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true
  })
);

app.use(cors('*'));

// Set up JWT authentication middleware
// app.use(async (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (token !== 'null') {
//     try {
//       const currentUser = await jwt.verify(token, process.env.SECRET);
//       req.currentUser = currentUser;
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   next();
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4444;

const options = {
  port: PORT,
  endpoint: '/graphql'
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(options, () => console.log('Server is running on localhost:4000'));
