/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// seeds/02_phones.js

exports.seed = function (knex) {
  return knex("phones")
    .del()
    .then(function () {
      return knex("phones").insert([
        {
          brand: "Apple",
          model: "iPhone 13",
          year: 2021,
          condition: "new",
          color: "black",
          storage: 128,
          price: 799.99,
          description: "Latest Apple smartphone with A15 chip.",
          is_available: true,
          trade_in: false,
        },
        {
          brand: "Samsung",
          model: "Galaxy S21",
          year: 2021,
          condition: "used",
          color: "gray",
          storage: 256,
          price: 699.99,
          description: "High-end Samsung smartphone with impressive features.",
          is_available: true,
          trade_in: true,
        },
        {
          brand: "Google",
          model: "Pixel 6",
          year: 2021,
          condition: "refurbished",
          color: "white",
          storage: 128,
          price: 599.99,
          description: "Google's flagship phone with excellent camera.",
          is_available: true,
          trade_in: true,
        },
      ]);
    });
};
