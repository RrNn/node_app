const dotenv = require('dotenv');
dotenv.config();
const databasePort = process.env.DB_PORT;
const databaseName = process.env.DB_NAME;
const databaseHost = process.env.DB_HOST;
const applicationPort = process.env.APPLICATION_PORT;

module.exports = {
  databasePort,
  databaseName,
  databaseHost,
  applicationPort,
};
