import type { DbSettings, SettingsTable } from '../../types/settings'

export function mapSettingsTableToDbSettings(
  settings: SettingsTable
): DbSettings {
  return {
    ...settings,
    audioDirectories: settings.audioDirectories.split(';'),
  }
}
