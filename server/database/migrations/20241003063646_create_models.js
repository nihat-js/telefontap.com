/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("models", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable(); // Model name
    table
      .integer("brand_id")
      .unsigned()
      .references("id")
      .inTable("brands")
      .onDelete("CASCADE"); // Foreign key to brands
    table.timestamps(true, true); // created_at and updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("models");
};
