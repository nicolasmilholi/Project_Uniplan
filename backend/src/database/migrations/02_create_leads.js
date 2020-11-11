exports.up = function(knex) {
  return knex.schema.createTable('leads', function (table) {
    table.increments();

    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('description').notNullable();
    table.string('whatsapp').notNullable();
    table.string('selectedCity').notNullable();
    table.string('selectedUf', 2).notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('leads');
};
