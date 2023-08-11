import { Dialect, Sequelize } from "sequelize";
import config from "../config/dbconfig";

const dbName = config.development.database as string;
const dbUser = config.development.username as string;
const dbPassword = config.development.password as string;
const dbHost = config.development.host;
const dbDriver = config.development.dialect as Dialect;

const db = new Sequelize({
  dialect: dbDriver, // Specify the dialect as 'postgres'
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: 5432,
  logging: false
});

export default db;