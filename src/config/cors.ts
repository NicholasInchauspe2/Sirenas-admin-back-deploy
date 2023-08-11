import checkNodeEnvironment from "../utils/checkNodeEnviroment";

const origin = checkNodeEnvironment("http://localhost:3000", "http://localhost:3000");

const corsConfig = {
  origin,
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
};

export default corsConfig;