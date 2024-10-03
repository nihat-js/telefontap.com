/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('brands', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique(); // Brand name
    table.timestamps(true, true); // created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('brands');
};