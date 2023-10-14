import type { IAudioMetadata } from 'music-metadata'
import { getArtistsFromString, getArtistsFromTags } from './artists'
import type { Album, DbAlbum } from '../../types/albums'
import type { DbTrack, Track } from '../../types/tracks'
import type { Artist, DbArtist } from '../../types/artist'
import type { AlbumTracks } from '../../types/album-tracks'
import type { AlbumArtists } from '../../types/album-artists'
import type { TrackArtists } from '../../types/track-artists'
import { getCoverForTracks, toBase64DataString } from './metadata'

function extractAlbumCover(album: string, tracks: IAudioMetadata[]) {
  const tracksInAlbum = tracks.filter(track => track.common.album === album)
  return getCoverForTracks(tracksInAlbum)
}

export function extractAlbumsFromTracks(tracks: IAudioMetadata[]) {
  const albums = tracks.map(track => track.common.album).filter(Boolean)
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
  const artists = tracks.flatMap(getArtistsFromTags)
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
      genre: track.common.genre.length ? track.common.genre.at(0) : undefined,
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
    .map<AlbumTracks>((track, index) => {
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
    .filter(Boolean)
}

export function extractAlbumArtists(
  albums: DbAlbum[],
  artists: DbArtist[],
  meta: IAudioMetadata[]
) {
  return albums.flatMap(album => {
    const artistIds = meta
      .filter(metaItem => metaItem.common.album === album.title)
      .flatMap(metaItem => getArtistsFromString(metaItem.common.albumartist))
      .map(albumArtist => {
        const artist = artists.find(artist => artist.name === albumArtist)
        if (!artist) {
          console.warn(`Artist not found for album ${album.id}`)
          return
        }

        return artist.id
      })
      .filter(Boolean)

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
    const artistsInTracks = getArtistsFromTags(meta[index])
    const artistIds = artistsInTracks
      .map(artistInTrack => {
        const art = artists.find(artist => artist.name === artistInTrack)
        if (!art) {
          console.warn(`Artist not found for track ${track.id}`)
          return
        }

        return art.id
      })
      .filter(Boolean)

    const artistIdsWithoutDuplicates = Array.from(new Set(artistIds))
    return artistIdsWithoutDuplicates.map<TrackArtists>(artistId => ({
      artistId,
      trackId: track.id,
    }))
  })
}
