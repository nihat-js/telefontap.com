// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  local_sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./database/db.sqlite",
    },
    useNullAsDefault: true,
  },
  local_mysql: {
    client: "mysql2",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "123456",
      database: "telefontap",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  aws_mysql: {
    client: "mysql2",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "123456",
      database: "telefontap",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "123456",
      database: "telefontap",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
