/* eslint-disable import/prefer-default-export */
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
/**
 *@description This function is used to populate users table using Faker.
 *@param {Knex} knex The knex instance
 *@returns {Promise<void>} The promise of table creation
 */
export const seed = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  const results = [];

  for (let i = 0; i <= 100; i += 1) {
    results.push(
      knex('users').insert([
        {
          uuid: uuidv4(),
          email: faker.internet.email(),
          username: faker.internet.displayName(),
          lastname: faker.person.lastName(),
          firstname: faker.person.firstName(),
          password: '$2b$10$e9N3n3nXtcWg8ivNpZUX/./5nJBTGUwLfg..F5LtIazPpqneJ6OgK',
        },
      ]),
    );
  }
  await Promise.all(results);
};

export default seed;
