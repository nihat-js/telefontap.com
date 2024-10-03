/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('brands').del()
    .then(function() {
      // Inserts seed entries
      return knex('brands').insert([
        { name: 'Apple' },
        { name: 'Samsung' },
        { name: 'Google' },
        { name: 'OnePlus' },
        { name: 'Xiaomi' }
      ]);
    });
};