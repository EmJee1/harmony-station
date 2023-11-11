import type { IAudioMetadata } from 'music-metadata'
import { filterDefined } from './array'
import { getCoverForTracks, toBase64DataString } from './metadata'
import {
  ARTIST_TAG_SEPARATOR,
  GENRE_TAG_SEPARATOR,
  separateTagValues,
} from './tag-separator'
import type { Album, DbAlbum } from '../../types/albums'
import type { DbTrack, Track } from '../../types/tracks'
import type { Artist, DbArtist } from '../../types/artist'
import type { AlbumTracks } from '../../types/album-tracks'
import type { AlbumArtists } from '../../types/album-artists'
import type { TrackArtists } from '../../types/track-artists'
import { DbGenre, Genre } from '../../types/genres'
import { GenreTracks } from '../../types/genre-tracks'

function extractAlbumCover(album: string, tracks: IAudioMetadata[]) {
  const tracksInAlbum = tracks.filter(track => track.common.album === album)
  return getCoverForTracks(tracksInAlbum)
}

export function extractAlbumsFromTracks(tracks: IAudioMetadata[]) {
  const albums = tracks.map(track => track.common.album).filter(filterDefined)
  const albumsWithoutDuplicates = Array.from(new Set(albums))
  return albumsWithoutDuplicates.map<Album>(album => {
    const cover = extractAlbumCover(album, tracks)

    return {
      title: album,
      cover: cover ? toBase64DataString(cover) : undefined,
    }
  })
}

export function extractArtistsFromTracks(tracks: IAudioMetadata[]) {
  const artists = tracks.flatMap(track =>
    separateTagValues(
      ARTIST_TAG_SEPARATOR,
      track.common.artist,
      track.common.albumartist,
      track.common.artists
    )
  )
  const artistsWithoutDuplicates = Array.from(new Set(artists))
  return artistsWithoutDuplicates.map<Artist>(artist => ({ name: artist }))
}

export function extractTracksFromTracks(
  paths: string[],
  metadata: IAudioMetadata[]
) {
  return metadata.map<Track>((track, index) => {
    return {
      path: paths[index],
      title: track.common.title ?? 'Unknown title',
      genre: track.common.genre?.length ? track.common.genre.at(0) : undefined,
      year: track.common.year,
    }
  })
}

export function extractAlbumTracks(
  albums: DbAlbum[],
  tracks: DbTrack[],
  meta: IAudioMetadata[]
) {
  return tracks
    .map<AlbumTracks | undefined>((track, index) => {
      const album = albums.find(album => {
        return album.title === meta[index].common.album
      })
      if (!album) {
        console.warn(`Album not found for track ${track.id}`)
        return
      }

      return {
        albumId: album.id,
        trackId: track.id,
      }
    })
    .filter(filterDefined)
}

export function extractAlbumArtists(
  albums: DbAlbum[],
  artists: DbArtist[],
  meta: IAudioMetadata[]
) {
  return albums.flatMap(album => {
    const artistIds = meta
      .filter(metaItem => {
        return (
          metaItem.common.album === album.title && metaItem.common.albumartist
        )
      })
      .flatMap(metaItem =>
        separateTagValues(ARTIST_TAG_SEPARATOR, metaItem.common.albumartist)
      )
      .map(albumArtist => {
        const artist = artists.find(artist => artist.name === albumArtist)
        if (!artist) {
          console.warn(`Artist not found for album ${album.id}`)
          return
        }

        return artist.id
      })
      .filter(filterDefined)

    const artistIdsWithoutDuplicates = Array.from(new Set(artistIds))
    return artistIdsWithoutDuplicates.map<AlbumArtists>(artistId => ({
      albumId: album.id,
      artistId,
    }))
  })
}

export function extractTrackArtists(
  tracks: DbTrack[],
  artists: DbArtist[],
  meta: IAudioMetadata[]
) {
  return tracks.flatMap((track, index) => {
    const common = meta[index].common
    const artistsInTracks = separateTagValues(
      ARTIST_TAG_SEPARATOR,
      common.artist,
      common.albumartist,
      common.artists
    )
    const artistIds = artistsInTracks
      .map(artistInTrack => {
        const art = artists.find(artist => artist.name === artistInTrack)
        if (!art) {
          console.warn(`Artist not found for track ${track.id}`)
          return
        }

        return art.id
      })
      .filter(filterDefined)

    const artistIdsWithoutDuplicates = Array.from(new Set(artistIds))
    return artistIdsWithoutDuplicates.map<TrackArtists>(artistId => ({
      artistId,
      trackId: track.id,
    }))
  })
}

export function extractGenresFromTracks(metadata: IAudioMetadata[]) {
  const genres = metadata.flatMap(meta => {
    return separateTagValues(GENRE_TAG_SEPARATOR, meta.common.genre)
  })
  const genresWithoutDuplicates = Array.from(new Set(genres))
  return genresWithoutDuplicates.map<Genre>(genre => ({ name: genre }))
}

export function extractGenreTracks(
  tracks: DbTrack[],
  genres: DbGenre[],
  metadata: IAudioMetadata[]
) {
  return tracks.flatMap((track, index) => {
    const common = metadata[index].common
    const trackGenres = separateTagValues(GENRE_TAG_SEPARATOR, common.genre)

    return trackGenres
      .map<GenreTracks | undefined>(trackGenre => {
        const genre = genres.find(g => g.name === trackGenre)
        if (!genre) {
          console.warn(`Genre ${trackGenre} not found for track ${track.id}`)
          return
        }

        return {
          genreId: genre.id,
          trackId: track.id,
        }
      })
      .filter(filterDefined)
  })
}
