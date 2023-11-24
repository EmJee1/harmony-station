export interface HealthError {
  text: string
  code: 'dir-not-visible'
}

export interface CheckHealthHealthyResult {
  healthy: true
}

export interface CheckHealthUnhealthyResult {
  healthy: false
  errors: HealthError[]
}

export type CheckHealthResult =
  | CheckHealthHealthyResult
  | CheckHealthUnhealthyResult
