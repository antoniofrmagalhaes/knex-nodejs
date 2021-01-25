import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_addresses', table => {
    table.increments().primary()
    table.integer('user_id').notNullable().references('id').inTable('users')
    table
      .integer('address_id')
      .notNullable()
      .references('id')
      .inTable('addresses')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users_addresses')
}
