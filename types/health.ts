interface HealthErrorBase {
  id: string
  code: string
  severity: 'warning' | 'error'
  meta: object
}

export interface DirNotVisibleHealthError extends HealthErrorBase {
  code: 'dir-not-visible'
  meta: {
    path: string
  }
}

export type AnyHealthError = DirNotVisibleHealthError

export interface CheckHealthHealthyResult {
  healthy: true
}

export interface CheckHealthUnhealthyResult {
  healthy: false
  errors: AnyHealthError[]
}

export type CheckHealthResult =
  | CheckHealthHealthyResult
  | CheckHealthUnhealthyResult
