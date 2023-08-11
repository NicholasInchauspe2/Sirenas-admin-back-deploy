import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import corsConfig from "./config/cors";
import multer from 'multer';
const seed  = require("./config/seed")
/* import { userRouter } from "./routes/index.routes.js"; */
import setHeaders from './middleware/setHeaders';
import { UserDaoPostgresSQL } from "./models/dao/user.dao";
// Remove this line if you don't need the 'excel' variable


import db from "./db";
import router from "./routes/index.routes";

dotevn.config();

const app = express();
/* const httpServer = new HttpServer(app); */

// levanto variables de un archivo .env
const PORT = Number(process.env.DB_PORT) || 3001;

// habilito el cors desde la url del front que voy a utilizar
app.use(express.json());
app.use("/", setHeaders);
app.use(cors(corsConfig));

app.use("/api", router)

db.sync({ force: false }).then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
  
    });
  });