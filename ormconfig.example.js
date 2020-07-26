module.exports = [
  {
    name: "heroku",
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
    migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
    cli: {
      migrationsDir: "./src/shared/infra/typeorm/migrations",
    },
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "docker",
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "server",
    password: "server",
    database: "serverdb",
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    cli: {
      migrationsDir: "./src/shared/infra/typeorm/migrations",
    },
  },
];
