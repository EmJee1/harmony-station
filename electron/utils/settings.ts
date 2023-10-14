import type { DbSettings, SettingsTable } from '../../types/settings'

const AUDIO_DIRECTORIES_SEPARATOR = ';'

export function mapSettingsTableToDbSettings(
  settings: SettingsTable
): DbSettings {
  return {
    ...settings,
    audioDirectories: settings.audioDirectories
      .split(AUDIO_DIRECTORIES_SEPARATOR)
      .filter(Boolean),
  }
}

export function mapDbSettingsPartialToSettingsTable(
  settings: Partial<DbSettings>
): Partial<SettingsTable> {
  const settingsTable: Partial<SettingsTable> = {}

  if (settings.audioDirectories) {
    settingsTable.audioDirectories = settings.audioDirectories.join(
      AUDIO_DIRECTORIES_SEPARATOR
    )
  }

  if (settings.id) {
    settingsTable.id = settings.id
  }

  return settingsTable
}
