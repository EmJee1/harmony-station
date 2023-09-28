type Environment = 'development' | 'production'

export function getValueForEnvironment<T>(values: Record<Environment, T>) {
  switch (process.env.NODE_ENV) {
    case 'development':
      return values.development
    case 'production':
      return values.production
    default:
      throw new Error('Invalid environment')
  }
}
