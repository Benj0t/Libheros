import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import Knex from 'knex';

import { AppModule } from './app.module';
import checkEnv from './utils/check-env';
import config from './knex/knexfile';

dotenv.config();

/**
 * @description Start up application
 */
async function bootstrap(): Promise<void> {
  try {
    checkEnv();

    const knex = Knex(config);

    // Testing DB connection before starting listening server
    await knex.raw('SELECT 1+1 as result');

    const app = await NestFactory.create(AppModule);

    const port = process.env.PORT as string;

    await app.listen(port);
  } catch (err) {
    console.log('Error during application startup', { err });
    process.exit(-1);
  }
}
bootstrap();
