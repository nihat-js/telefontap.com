/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("phones", function (table) {
    table.increments("id").primary();
    table.string("brand").notNullable();
    table.string("model").notNullable();
    table.integer("year").notNullable();
    table.string("condition").notNullable(); // e.g., "new", "used", "refurbished"
    table.decimal("price", 10, 2).notNullable();
    table.string("description");
    table.integer('storage'); // Storage in GB
    table.boolean('trade_in').defaultTo(false); // Trade-in eligibility
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("phones");
};
