import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import type { DirNotVisibleHealthError } from '../../types/health'

export async function directoryExists(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

export function directoryDoesNotExistHealthError(
  path: string
): DirNotVisibleHealthError {
  return {
    id: crypto.randomUUID(),
    code: 'dir-not-visible',
    severity: 'error',
    meta: {
      path,
    },
  }
}
