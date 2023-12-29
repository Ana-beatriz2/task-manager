exports.up = knex => {
    return knex.schema.createTable("user", (table) => {
      table.uuid("id").primary(),
      table.string("name").notNullable(),
      table.string("email").notNullable().unique(),
      table.string("password").notNullable()
    });
  };
    
  exports.down = knex => knex.schema.dropTable("user");