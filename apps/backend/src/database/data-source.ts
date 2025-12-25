import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USERNAME || "skillconnect",
  password: process.env.DATABASE_PASSWORD || "skillconnect_password",
  database: process.env.DATABASE_NAME || "skillconnect_jk",
  synchronize: false,
  logging: process.env.LOG_LEVEL === "debug",
  entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});

export default AppDataSource;
