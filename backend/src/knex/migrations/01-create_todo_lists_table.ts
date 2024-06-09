import { Knex } from 'knex';

export const up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable('todo_lists', (table) => {
    table.uuid('uuid').primary().notNullable();
    table.uuid('user_uuid').notNullable();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_uuid').references('uuid').inTable('users');
  });
};

export const down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable('todo_lists');
};
