import path from 'node:path'
import { app } from 'electron'
import knex from 'knex'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { getValueForEnvironment } from '../utils/environment'
import * as schema from '../schemas/schemas'

export function getDatabase() {
  const dbPath = getValueForEnvironment({
    development: './.data',
    production: app.getPath('appData'),
  })

  return knex({
    client: 'sqlite3',
    connection: {
      filename: `${dbPath}/database.sqlite`,
    },
    useNullAsDefault: true,
  })
}

export function getDrizzle() {
  const dbPath = getValueForEnvironment({
    development: path.resolve('./.data'),
    production: app.getPath('appData'),
  })

  // TODO: implement DB connection error handling
  const sqlite = new Database(`${dbPath}/database.sqlite`)
  return drizzle(sqlite, {
    schema,
  })
}
