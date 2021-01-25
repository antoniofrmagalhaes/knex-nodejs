import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(new Date().toISOString())
    table.timestamp('updated_at').defaultTo(new Date().toISOString())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
