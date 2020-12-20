const express = require('express');

const cors = require('cors');

const database = require('./database/connect');

const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const { applicationPort } = require('./config');

database.Connect();

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(applicationPort, () =>
  console.info(`Listening for requests on port ${applicationPort}`)
);
