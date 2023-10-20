import type { DbTrack } from './tracks'

type ContextMenuVersion = 'track' | 'queue-item'
type TrackContextMenuOption = 'play' | 'add-to-queue'
type QueueItemContextMenuOption = 'play' | 'remove-from-queue'

interface BaseContextMenuRequest {
  version: ContextMenuVersion
}

export interface TrackContextMenuRequest extends BaseContextMenuRequest {
  version: 'track'
  track: string // Stringified DbTrack object
}

export interface QueueItemMenuRequest extends BaseContextMenuRequest {
  version: 'queue-item'
  track: string // Stringified DbTrack object
}

export type ContextMenuRequest = TrackContextMenuRequest | QueueItemMenuRequest

interface BaseContextMenuResponse {
  version: ContextMenuVersion
  option: TrackContextMenuOption | QueueItemContextMenuOption
}

export interface TrackContextMenuResponse extends BaseContextMenuResponse {
  version: 'track'
  option: TrackContextMenuOption
  track: string // Stringified DbTrack object
}

export interface QueueItemContextMenuResponse extends BaseContextMenuResponse {
  version: 'queue-item'
  option: QueueItemContextMenuOption
  track: string // Stringified DbTrack object
}

export type ContextMenuResponse =
  | TrackContextMenuResponse
  | QueueItemContextMenuResponse
