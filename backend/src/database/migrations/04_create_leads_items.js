exports.up = function(knex)  {
        return knex.schema.createTable('leads_items', table => {
            table.increments('id').primary();
        
            table.integer('leads_id')
              .notNullable()
              .references('id')
              .inTable('leads');
        
            table.integer('item_id')
              .notNullable()
              .references('id')
              .inTable('items');
          });
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('items');
  }