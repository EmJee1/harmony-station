/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

import type { InferSelectModel } from 'drizzle-orm'
import type { DbTrack } from '../../types/tracks'
import type { DbGenre } from '../../types/genres'
import type { DbArtist } from '../../types/artist'
import type { DbAlbum } from '../../types/albums'
import * as schemas from '../schemas'

export function mapQueriedTrackToTrack(
  queriedTrack: InferSelectModel<typeof schemas.tracks>
): DbTrack {
  const { genresToTracks, albumsToTracks, tracksToArtists, ...rest } =
    queriedTrack

  const album = albumsToTracks?.at(0)?.album

  return {
    ...rest,
    genres: genresToTracks?.map(gt => mapQueriedGenreToGenre(gt.genre)),
    artists: tracksToArtists?.map(ta => mapQueriedArtistToArtist(ta.artist)),
    album: album ? mapQueriedAlbumToAlbum(album) : undefined,
  }
}

export function mapQueriedGenreToGenre(
  queriedGenre: InferSelectModel<typeof schemas.genres>
): DbGenre {
  const { genresToTracks, ...rest } = queriedGenre

  return {
    ...rest,
    tracks: genresToTracks?.map(gt => mapQueriedTrackToTrack(gt.track)),
  }
}

export function mapQueriedArtistToArtist(
  queriedArtist: InferSelectModel<typeof schemas.artists>
): DbArtist {
  const { albumsToArtists, tracksToArtists, ...rest } = queriedArtist

  return {
    ...rest,
    albums: albumsToArtists?.map(aa => mapQueriedAlbumToAlbum(aa.album)),
    tracks: tracksToArtists?.map(ta => mapQueriedTrackToTrack(ta.track)),
  }
}

export function mapQueriedAlbumToAlbum(
  queriedAlbum: InferSelectModel<typeof schemas.albums>
): DbAlbum {
  const { albumsToTracks, albumsToArtists, ...rest } = queriedAlbum

  return {
    ...rest,
    albumArtists: albumsToArtists?.map(aa =>
      mapQueriedArtistToArtist(aa.artist)
    ),
    tracks: albumsToTracks?.map(at => mapQueriedTrackToTrack(at.track)),
  }
}
