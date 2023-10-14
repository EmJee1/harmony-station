import { getDatabase } from './database'
import type { DbSettings, Settings, SettingsTable } from '../../types/settings'
import {
  mapDbSettingsPartialToSettingsTable,
  mapSettingsTableToDbSettings,
} from '../utils/settings'

const defaultSettings: SettingsTable = {
  id: 1,
  audioDirectories: '',
}

export async function getSettings(): Promise<Settings> {
  let settings = await getDatabase()('settings').first()
  if (!settings) {
    console.log('No settings found, creating default settings')
    await setDefaultSettings()
    settings = defaultSettings
  }

  return mapSettingsTableToDbSettings(settings)
}

export async function setDefaultSettings() {
  await getDatabase()('settings').insert(defaultSettings)
}

export async function updateSettings(update: Partial<DbSettings>) {
  const settingsTable = mapDbSettingsPartialToSettingsTable(update)
  await getDatabase()('settings')
    .where({ id: defaultSettings.id })
    .update(settingsTable)
}
