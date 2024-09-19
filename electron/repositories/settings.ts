import { eq } from 'drizzle-orm'
import type { DbSettings, Settings, SettingsTable } from '../../types/settings'
import { getDrizzle } from './database'
import {
  mapDbSettingsPartialToSettingsTable,
  mapSettingsTableToDbSettings,
} from '../utils/settings'
import { settings } from '../schemas'

const defaultSettings: SettingsTable = {
  id: 1,
  audioDirectories: '',
}

export async function getSettings(): Promise<Settings> {
  let settings = await getDrizzle().query.settings.findFirst()
  if (!settings) {
    console.log('No settings found, creating default settings')
    await setDefaultSettings()
    settings = defaultSettings
  }

  return mapSettingsTableToDbSettings(settings)
}

export async function setDefaultSettings() {
  await getDrizzle().insert(settings).values(defaultSettings)
}

export async function updateSettings(update: Partial<DbSettings>) {
  const settingsTable = mapDbSettingsPartialToSettingsTable(update)

  await getDrizzle()
    .update(settings)
    .set(settingsTable)
    .where(eq(settings.id, defaultSettings.id))
}
