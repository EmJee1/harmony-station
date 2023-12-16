import { ref } from 'vue'
import { useFullscreenLoaderStore } from '../stores/fullscreen-loader-store'
import { useOptions } from './options'

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

const loaderMessages: Partial<Record<ElectronAPIMethod, string>> = {
  getSettings: 'Loading settings',
  updateSettings: 'Updating settings',
  getAlbums: 'Loading albums',
  getAlbum: 'Loading album',
  getArtist: 'Loading artist',
  scanTracks: 'Scanning tracks',
  selectDirectory: 'Selecting audio directory',
}

interface UseElectronRequestOptions {
  /**
   * Automatically applies the fullscreenLoader while a request is executing.
   * This might be disabled if you want to implement a custom loading state.
   * @default true
   */
  fullscreenLoader?: boolean
}

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
  options: UseElectronRequestOptions = {}
) {
  const { registerFullscreenLoader, unregisterFullscreenLoader } =
    useFullscreenLoaderStore()
  const getOption = useOptions(options, { fullscreenLoader: true })

  const loading = ref(false)
  const error = ref<string | null>(null)
  const response = ref<ElectronAPIMethodReturnType<T>>()
  const success = ref(false)

  async function execute(...methodParams: ElectronAPIMethodParams<T>) {
    const showFullscreenLoader = getOption('fullscreenLoader')

    loading.value = true

    const LOADER_ID = Symbol()
    if (showFullscreenLoader) {
      registerFullscreenLoader(LOADER_ID, loaderMessages[method])
    }

    try {
      response.value = (await window.electronAPI[method](
        // @ts-expect-error TS cannot infer the parameter type correctly (inferred as never)
        ...methodParams
      )) as ElectronAPIMethodReturnType<T>
    } catch (err) {
      error.value = getUserFacingError(err)
    }

    if (showFullscreenLoader) {
      unregisterFullscreenLoader(LOADER_ID)
    }
    loading.value = false
  }

  return {
    execute,
    response,
    success,
    error,
  }
}
