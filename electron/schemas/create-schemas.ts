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
    getDatabase().schema.createTable('tracks', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('path').notNullable()
      tableBuilder.text('title').notNullable()
      tableBuilder.text('genre')
      tableBuilder.integer('year')
    })
  }

  if (!(await tableExists('albums'))) {
    console.log('Creating table "albums"')
    getDatabase().schema.createTable('albums', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('title').notNullable()
      tableBuilder.text('cover')
    })
  }

  if (!(await tableExists('album_tracks'))) {
    console.log('Creating table "album_tracks"')
    return getDatabase().schema.createTable('album_tracks', tableBuilder => {
      tableBuilder.integer('trackId').references('id').inTable('tracks')
      tableBuilder.integer('albumId').references('id').inTable('albums')
      tableBuilder.primary(['trackId', 'albumId'])
    })
  }

  if (!(await tableExists('artists'))) {
    console.log('Creating table "artists"')
    getDatabase().schema.createTable('artists', tableBuilder => {
      tableBuilder.increments('id')
      tableBuilder.text('name').notNullable()
    })
  }
}
