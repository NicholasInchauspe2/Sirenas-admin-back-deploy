import dotenv from "dotenv";
import { UserDaoPostgresSQL } from "../models/dao/user.dao";
import { WorkshopDaoPostgresSQL } from "../models/dao/workshop.dao";
import { UserSchema, WorkshopSchema } from "./schema/index.schema";


let user: any;
let workshop: any;

dotenv.config();

const opcion = process.env.DB || "postgres";

switch (opcion) {
  case "postgres":
    user = new UserDaoPostgresSQL();
    workshop = new WorkshopDaoPostgresSQL();
    break;
  case "MONGO":
    break;
  case "firebase":
    break;
}

class DaoFactory {
  static getUserDao() {
    return user;
  }
  static getWorkshopDao() {
    return workshop;
  }
}

export { DaoFactory };