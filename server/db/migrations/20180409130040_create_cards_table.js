exports.up = function(knex, Promise) {
  return knex.schema.createTable(`cards`, table => {
    table.increments();
    table.string(`title`).notNullable();
    table.enu(`priority`, [`low`, `medium`, `high`, `blocker`]).notNullable();
    table.enu(`status`, [`queue`, `progress`, `done`]).defaultTo(`queue`).notNullable();
    table.string(`created_by`).notNullable();
    table.string(`assigned_to`).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(`cards`);
};