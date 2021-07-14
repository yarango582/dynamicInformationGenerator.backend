const { resolve } = require('path');

module.exports = [
   {
      name: "default",
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      logging: process.env.TYPE_ORM_LOGGING,
      entities: [resolve(__dirname, process.env.DATABASE_ENTITY_DIRECTORY)],
      migrations: [resolve(__dirname, process.env.DATABASE_MIGRATIONS_DIRECTORY)],
      subscribers: [resolve(__dirname, process.env.DATABASE_SUBSCRIBERS_DIRECTORY)],
      cli: {
        entitiesDir: process.env.TYPE_ORM_ENTITIES_DIR,
        migrationsDir: process.env.TYPE_ORM_MIGRATIONS_DIR,
        subscribersDir: process.env.TYPE_ORM_SUBSCRIBERS_DIR
      },
      ssl:
        process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    },
]