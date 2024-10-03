/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          username: "john_doe",
          email: "john@example.com",
          password: "hashed_password_1", // Use a proper hashing method in a real app
          first_name: "John",
          last_name: "Doe",
        },
        {
          username: "jane_doe",
          email: "jane@example.com",
          password: "hashed_password_2",
          first_name: "Jane",
          last_name: "Doe",
        },
      ]);
    });
};
