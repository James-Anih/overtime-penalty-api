/* eslint-disable */
require('dotenv/config');
let databaseConfig;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  databaseConfig = {
    host: process.env.POSTGRES_DATABASE_HOST || '127.0.0.1',
    username: process.env.POSTGRES_DATABASE_USERNAME || 'root',
    password: process.env.POSTGRES_DATABASE_PASSWORD || 'root',
    database: process.env.POSTGRES_DATABASE_NAME || 'ReservationSystemDB',
    port: Number(process.env.POSTGRES_DATABASE_PORT || '5432'),
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    logging: (str) => {
      return process.env.POSTGRES_DATABASE_SHOW_LOGS === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    }
  };
}

module.exports = {
  development: {
    ...databaseConfig,
    logging: true
  },
  test: {
    ...databaseConfig,
    logging: true
  }
};
