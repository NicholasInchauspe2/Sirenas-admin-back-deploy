import { Request, Response, NextFunction } from "express";
import checkNodeEnvironment from "../utils/checkNodeEnviroment";

const origin = checkNodeEnvironment("http://localhost:3000", "http://localhost:3000");

const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", origin);

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", 'true');

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  // Pass to next layer of middleware
  next();
};

export default setHeaders;