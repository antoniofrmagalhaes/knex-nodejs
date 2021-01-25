import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', table => {
    table.increments('id').primary()
    table.string('street')
    table.string('number')
    table.string('district')
    table.string('city')
    table.string('uf', 2)
    table.string('supplement')
    table.timestamp('created_at').defaultTo(new Date().toISOString())
    table.timestamp('updated_at').defaultTo(new Date().toISOString())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addresses')
}
