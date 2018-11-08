const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

//this is where you'll put your dataabse settings (recommended using mLab, read their docs on how to set it up)
//An example would be "mongodb://<dbuser>:<dbpassword>@ds153778.mlab.com:53778/db-name"
mongoose.connect('<link to database>');

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
