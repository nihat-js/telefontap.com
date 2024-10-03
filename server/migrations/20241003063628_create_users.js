// migrations/YYYYMMDDHHMMSS_create_users.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('phone').notNullable().unique()
    table.string('password').notNullable()
    table.float("balance",13,2)
    table.timestamps(true, true) // created_at and updated_at
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
