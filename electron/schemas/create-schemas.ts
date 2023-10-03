import { getDatabase } from '../repositories/database'

export function createSchemas() {
  return getDatabase().schema.createTableIfNotExists('tracks', tableBuilder => {
    tableBuilder.increments('id')
    tableBuilder.text('path').notNullable()
    tableBuilder.text('title').notNullable()
    tableBuilder.text('genre')
    tableBuilder.integer('year')
  })
}
