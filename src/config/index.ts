import convict from 'convict';

const config = convict({
  env: {
    default: 'development',
    env: 'NODE_ENV',
    doc: 'The application environment',
    format: ['development', 'test']
  },
  port: {
    arg: 'port',
    default: 3300,
    doc: 'The port to bind',
    env: 'APP_PORT',
    format: 'port'
  },
  appUrl: {
    default: "http://localhost:8800", 
    doc: 'App url',
    env: 'APP_URL',
    nullable: false,
    format: String
  },
  showLogs: {
    arg: 'show-app-logs',
    default: true,
    doc: 'To determine whether to show application logs',
    env: 'SHOW_APP_LOGS',
    nullable: true,
    format: Boolean
  },
  postgreSqlDatabase: {
    host: {
      default: '127.0.0.1',
      doc: 'PostgreSql database host name/IP',
      env: 'POSTGRES_DATABASE_HOST',
      format: '*'
    },
    port: {
      default: 5432,
      doc: 'PostgreSql database server port',
      env: 'POSTGRES_DATABASE_PORT',
      format: 'port'
    },
    name: {
      default: 'ReservationSystemDB',
      doc: 'PostgreSql database name',
      env: 'POSTGRES_DATABASE_NAME',
      nullable: false,
      format: String
    },
    username: {
      default: 'postgres',
      doc: 'PostgreSql database username',
      env: 'POSTGRES_DATABASE_USERNAME',
      nullable: false,
      format: String
    },
    password: {
      doc: 'PostgreSql database password',
      env: 'POSTGRES_DATABASE_PASSWORD',
      format: String,
      nullable: true,
      default: '',
      sensitive: true
    },
    showLogs: {
      default: true,
      doc: 'To determine whether to show postgres database logs',
      env: 'POSTGRES_DATABASE_SHOW_LOGS',
      format: Boolean
    },
    dialect: {
      default: 'postgres',
    }
  }
});

export default config;
