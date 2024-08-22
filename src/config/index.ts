import 'dotenv/config';

export const EnvConfig = {
  database: {
    HOST_DB: process.env.DB_HOST,
    PORT_DB: +process.env.POSTGRES_PORT,
    USER_DB: process.env.POSTGRES_USER,
    PASSWORD_DB: process.env.POSTGRES_PASSWORD,
    NAME_DB: process.env.NAME_DB,
    URL: process.env.URL_DATABASE,
  },
  redis: {
    HOST: process.env.REDIS_HOST,
    PORT: +process.env.REDIS_PORT,
  },
};
