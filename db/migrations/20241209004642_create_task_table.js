const knex = require('knex')

exports.up = function(knex) {
    return knex.schema
      .createTable('task', function (table) {
        table.increments('id');
        table.string('title', 255).notNullable();
        table.integer('category').notNullable();
        table.timestamps();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('task');
  };