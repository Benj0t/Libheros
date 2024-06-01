import Knex from 'knex';

import config from './knexfile';

// eslint-disable-next-line import/prefer-default-export
export const knex = Knex(config);
