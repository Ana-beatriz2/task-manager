
exports.up = knex => {
    return knex.schema.createTable("task", (table) => {
        table.uuid("id").primary()
        table.string("name").notNullable()
        table.timestamp("deadline").nullable()
        table.string("description").nullable()
        table.uuid("user_id").references("id").inTable("user").onDelete("CASCADE");
    })
};

exports.down = knex => knex.schema.dropTable("task");
