import type { Settings, SettingsTable } from '../../types/settings'
import { getDatabase } from './database'
import { mapSettingsTableToDbSettings } from '../utils/settings'

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
  await getDatabase()('settings').insert({ id: 1, audioDirectories: '' })
}
