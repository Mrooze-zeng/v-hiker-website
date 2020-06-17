import "reflect-metadata";
import { createConnection } from "typeorm";

const lib = process.env?.DIR.trim();
const host = process.env?.HOST;

export default async function (
  config = {
    type: "postgres",
    host: host || "0.0.0.0",
    port: 5432,
    username: "userabc",
    password: "123123",
    database: "db",
    synchronize: true,
    logging: true,
    entities: [`${lib}/entity/*.js`],
    subscribers: [`${lib}/subscriber/*.js`],
    migrations: [`${lib}/migration/*.js`],
    cli: {
      migrationsDir: `${lib}/migration`,
    },
  }
) {
  return await createConnection(config);
}
