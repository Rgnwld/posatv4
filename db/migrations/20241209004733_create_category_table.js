const knex = require('knex')

exports.up = function(knex) {
    return knex.schema
      .createTable('category', function (table) {
        table.increments('id');
        table.string('title', 255).notNullable();
        table.timestamps();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('category');
  };