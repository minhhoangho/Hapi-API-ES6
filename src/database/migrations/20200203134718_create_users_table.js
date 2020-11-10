export const up = async knex =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.integer('roleId');
    table
      .foreign('roleId')
      .references('roles.id')
      .onDelete('CASCADE');

    table.string('username').unique();
    table.string('password');
    table.string('fullName');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

export const down = async knex => knex.schema.dropTableIfExists('users');
