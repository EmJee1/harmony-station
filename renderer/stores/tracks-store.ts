import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Track } from '../../types/tracks'
import { Album } from '../../types/albums'

export const useTracksStore = defineStore('tracks', () => {
  const tracks = ref<Track[]>([])
  const albums = ref<Album[]>([])

  /**
   * Fetches the tracks from the main process and updates the store.
   * @example
   * await fetchTracks()
   * console.log(tracks.value)
   */
  async function fetchTracks() {
    tracks.value = await window.electronAPI.getTracks()
  }

  async function fetchAlbums() {
    albums.value = await window.electronAPI.getAlbums()
  }

  return {
    tracks,
    fetchTracks,
    fetchAlbums,
  }
})
