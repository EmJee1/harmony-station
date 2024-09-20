export interface Settings {
  audioDirectories: string[]
}

export interface DbSettings extends Settings {
  id: number
}

/**
 * Settings table types are different since we cannot store an array in SQLite.
 */
export interface SettingsTable {
  id: number
  /**
   * Semicolon-separated list of audio directories.
   */
  audioDirectories: string
  // TODO: scan depth setting
}
