// migrations/YYYYMMDDHHMMSS_create_users.js

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable(); // Store hashed passwords
    table.string('first_name');
    table.string('last_name');
    table.timestamps(true, true); // created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
