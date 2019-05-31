const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(
	'mongodb://richard:lalala546@ds153778.mlab.com:53778/gql-ninja'
);

mongoose.connection.once('open', () => {
	console.log('Connected to mLab database');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(8000, () => {
	console.log('Server started on localhost:8000');
});
