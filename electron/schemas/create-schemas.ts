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

  if (!(await tableExists('albums_tracks'))) {
    console.log('Creating table "albums_tracks"')
    getDatabase().schema.createTable('albums_tracks', tableBuilder => {
      tableBuilder.integer('track_id').references('id').inTable('tracks')
      tableBuilder.integer('album_id').references('id').inTable('albums')
      tableBuilder.primary(['track_id', 'album_id'])
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
