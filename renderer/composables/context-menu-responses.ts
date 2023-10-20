import { onMounted } from 'vue'
import { useAudioControls } from './audio-controls'
import type {
  QueueItemContextMenuResponse,
  TrackContextMenuResponse,
} from '../../types/context-menu'
import { DbTrack } from '../../types/tracks'

export function useContextMenuResponses() {
  const { addToQueue, playTrack, playQueueTrack, removeTrackFromQueue } =
    useAudioControls()

  function handleTrackAction(arg: TrackContextMenuResponse) {
    const track = JSON.parse(arg.track) as DbTrack

    switch (arg.option) {
      case 'add-to-queue':
        addToQueue(track)
        break
      case 'play':
        playTrack(track)
        break
      default:
        throw new Error('Unknown track-action in context-menu-response')
    }
  }

  function handleQueueItemAction(arg: QueueItemContextMenuResponse) {
    const track = JSON.parse(arg.track) as DbTrack

    switch (arg.option) {
      case 'play':
        playQueueTrack(track)
        break
      case 'remove-from-queue':
        removeTrackFromQueue(track)
        break
      default:
        throw new Error('Unknown track-action in context-menu-response')
    }
  }

  onMounted(() => {
    window.electronAPI.onContextMenuAction((_, arg) => {
      switch (arg.version) {
        case 'track':
          handleTrackAction(arg)
          break
        case 'queue-item':
          handleQueueItemAction(arg)
          break
        default:
          throw new Error('Unknown context-menu version')
      }
    })
  })
}
