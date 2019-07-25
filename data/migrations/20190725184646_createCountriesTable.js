
exports.up = function(knex) {
  return knex.schema.createTable('countries', table => {
    table.increments();
    table.text('name')
      .notNullable()
      .unique();
    table.text('capital')
      .notNullable();
    table.integer('population')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('countries');
};
