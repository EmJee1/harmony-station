import { getDatabase } from '../repositories/database'

/**
 * Create schemas in the database
 */
export async function createSchemas() {
  function tableExists(table: string) {
    return getDatabase().schema.hasTable(table)
  }

  if (!(await tableExists('tracks'))) {
    console.log('Creating table "tracks"')
    await getDatabase().schema.createTable('tracks', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('path').notNullable()
      tableBuilder.text('title').notNullable()
      tableBuilder.integer('year')
    })
  }

  if (!(await tableExists('albums'))) {
    console.log('Creating table "albums"')
    await getDatabase().schema.createTable('albums', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('title').notNullable()
      tableBuilder.text('cover')
    })
  }

  if (!(await tableExists('album_tracks'))) {
    console.log('Creating table "album_tracks"')
    await getDatabase().schema.createTable('album_tracks', tableBuilder => {
      tableBuilder.integer('trackId').references('id').inTable('tracks')
      tableBuilder.integer('albumId').references('id').inTable('albums')
      tableBuilder.primary(['trackId', 'albumId'])
    })
  }

  if (!(await tableExists('artists'))) {
    console.log('Creating table "artists"')
    await getDatabase().schema.createTable('artists', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('name').notNullable()
    })
  }

  if (!(await tableExists('genres'))) {
    console.log('Creating table "genres"')
    await getDatabase().schema.createTable('genres', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('name')
    })
  }

  if (!(await tableExists('album_artists'))) {
    console.log('Creating table "album_artists"')
    await getDatabase().schema.createTable('album_artists', tableBuilder => {
      tableBuilder.integer('albumId').references('id').inTable('albums')
      tableBuilder.integer('artistId').references('id').inTable('artists')
      tableBuilder.primary(['albumId', 'artistId'])
    })
  }

  if (!(await tableExists('track_artists'))) {
    console.log('Creating table "track_artists"')
    await getDatabase().schema.createTable('track_artists', tableBuilder => {
      tableBuilder.integer('trackId').references('id').inTable('tracks')
      tableBuilder.integer('artistId').references('id').inTable('artists')
      tableBuilder.primary(['trackId', 'artistId'])
    })
  }

  if (!(await tableExists('genre_tracks'))) {
    console.log('Creating table "genre_tracks"')
    await getDatabase().schema.createTable('genre_tracks', tableBuilder => {
      tableBuilder.integer('genreId').references('id').inTable('genres')
      tableBuilder.integer('trackId').references('id').inTable('tracks')
      tableBuilder.primary(['genreId', 'trackId'])
    })
  }

  if (!(await tableExists('settings'))) {
    console.log('Creating table "settings"')
    await getDatabase().schema.createTable('settings', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('audioDirectories').notNullable()
    })
  }
}
