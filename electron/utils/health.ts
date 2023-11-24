import fs from 'node:fs/promises'
import type { HealthError } from '../../types/health'

export async function directoryExists(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

export function directoryDoesNotExistHealthError(path: string): HealthError {
  return {
    text: `The directory "${path}" could not be opened`,
    code: 'dir-not-visible',
  }
}
