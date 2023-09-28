import { app } from 'electron'
import Datastore from 'nedb-promises'
import { getValueForEnvironment } from '../utils/environment'
import type { DbTrack } from '../../types/tracks'
import type { Settings } from '../../types/settings'

type Database = DbTrack | Settings

export function getDatabase<T extends Database>(
  database: 'settings' | 'tracks'
): Datastore<T> {
  const dbPath = getValueForEnvironment({
    development: './.data',
    production: app.getPath('appData'),
  })

  return Datastore.create({
    filename: `${dbPath}/${database}.db`,
    autoload: true,
  })
}
