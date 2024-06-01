import { Knex } from 'knex';

export const up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable('users', (table) => {
    table.uuid('uuid').primary().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('username', 255).unique().notNullable();
    table.string('lastname', 255).notNullable();
    table.string('firstname', 255).notNullable();
    table.string('password', 255).notNullable();
    table.boolean('enabled').notNullable();
  });
};

export const down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable('users');
};
