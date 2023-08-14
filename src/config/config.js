import { connect } from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import commander from "../utils/commander.js";

const { mode } = commander.opts();

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

const url = process.env.MONGO_URL;

let configObject = {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  mode: process.env.MODE,
  jwt_secret_key: process.env.JWT_SECRET || "",
  dbConnection: async () => {
    try {
      console.log("db conectada");
      return await connect(url);
    } catch (error) {
      console.log(error);
      process.exit();
    }
  },
  session: {
    store: MongoStore.create({
      mongoUrl: url,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 150,
    }),
    secret: "s3cr3t123",
    resave: false,
    saveUninitialized: false,
    maxAge: 10000000000000,
  },
};

export default configObject;
