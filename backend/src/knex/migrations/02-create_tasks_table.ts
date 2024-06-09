import { Knex } from 'knex';

export const up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('uuid').primary().notNullable();
    table.uuid('table_id').notNullable();
    table.string('name').notNullable();
    table.string('description_short', 200).notNullable();
    table.text('description_long');
    table.timestamp('deadline').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.boolean('finished').defaultTo(false);

    table.foreign('table_id').references('uuid').inTable('todo_lists');
  });
};

export const down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable('tasks');
};
