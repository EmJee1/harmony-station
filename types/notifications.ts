interface CreateNotification<T extends string, U extends object> {
  id: string
  severity: 'warning' | 'error'
  code: T
  meta: U
}

export type Notification = CreateNotification<
  'dir-not-readable',
  { path: string }
>
