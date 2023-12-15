import { ref } from 'vue'
import { useFullscreenLoaderStore } from '../stores/fullscreen-loader-store'

function getUserFacingError(err: unknown) {
  if (err instanceof Error) {
    return err.message
  }

  return 'Er is iets fout gegaan'
}

type ElectronAPIMethod = keyof typeof window.electronAPI
type ElectronAPIMethodParams<T extends ElectronAPIMethod> = Parameters<
  (typeof window.electronAPI)[T]
>
type ElectronAPIMethodReturnType<T extends ElectronAPIMethod> = Awaited<
  ReturnType<(typeof window.electronAPI)[T]>
>

/**
 * Composable that provides a helpful wrapper around asynchronous actions.
 * Returns the awaitable function; this is where you should define your asynchronous code.
 * The success boolean becomes true when a single awaitable function has completed without throwing.
 * @example
 * const { awaitable, loading, error, success } = useAwaitable()
 * const onSubmit = awaitable(async () => {
 *   if (name.value === '') {
 *     throw new Error('Name should not be empty')
 *   }
 *   await fetch('https://some-resource.com')
 * })
 */
export function useElectronRequest<T extends ElectronAPIMethod>(
  method: T,
  loaderMessage?: string
) {
  const { registerFullscreenLoader, unregisterFullscreenLoader } =
    useFullscreenLoaderStore()

  const error = ref<string | null>(null)
  const response = ref<ElectronAPIMethodReturnType<T>>()
  const success = ref(false)

  async function execute(...methodParams: ElectronAPIMethodParams<T>) {
    const LOADER_ID = Symbol()
    registerFullscreenLoader(LOADER_ID, loaderMessage)

    try {
      response.value = (await window.electronAPI[method](
        // @ts-expect-error TS cannot infer the parameter type correctly
        ...methodParams
      )) as ElectronAPIMethodReturnType<T>
    } catch (err) {
      error.value = getUserFacingError(err)
    }

    unregisterFullscreenLoader(LOADER_ID)
  }

  return {
    execute,
    response,
    success,
    error,
  }
}
