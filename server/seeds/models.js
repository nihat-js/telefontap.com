/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("models")
    .del()
    .then(function () {
      return knex("models").insert([
        { name: "iPhone 13", brand_id: 1 },
        { name: "Galaxy S21", brand_id: 2 },
        { name: "Pixel 6", brand_id: 3 },
        { name: "OnePlus 9", brand_id: 4 },
        { name: "Redmi Note 10", brand_id: 5 },
      ]);
    });
};
