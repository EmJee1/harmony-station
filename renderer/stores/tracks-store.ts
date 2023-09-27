import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { Track } from '../../types/tracks'

export const useTracksStore = defineStore('tracks', () => {
  const tracks = ref<Track[]>([])

  /**
   * Fetches the tracks from the main process and updates the store.
   * @example
   * await fetchTracks()
   * console.log(tracks.value)
   */
  async function fetchTracks() {
    tracks.value = await window.electronAPI.getTracks()
  }

  watch(
    () => tracks.value,
    tracks => console.log(tracks)
  )

  return {
    tracks,
    fetchTracks,
  }
})
