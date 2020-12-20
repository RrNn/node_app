const mongoose = require('./config');
const { databasePort, databaseName, databaseHost } = require('../config');

const Connect = () => {
  mongoose.connect(
    `'mongodb://${databaseHost}:${databasePort}/${databaseName}'`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.once('open', () =>
    console.info(`Connected to the "${databaseName}" Database`)
  );
};

module.exports = { Connect };
