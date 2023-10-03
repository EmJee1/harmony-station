import { DbTrack } from './types/tracks'

declare module 'knex/types/tables' {
  interface Tables {
    tracks: DbTrack
  }
}
