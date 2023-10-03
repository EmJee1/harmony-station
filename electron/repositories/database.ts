import { app } from 'electron'
import knex from 'knex'
import { getValueForEnvironment } from '../utils/environment'

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
  })
}
