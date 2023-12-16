export function useOptions<const T extends object>(
  options: T,
  defaults: Partial<T>
) {
  function get(key: keyof T) {
    return options?.[key] ?? defaults[key]
  }

  return get
}
