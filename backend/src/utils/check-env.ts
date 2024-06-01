import * as dotenv from 'dotenv';

// Configure dotenv to load environment variables from the .env file.
dotenv.config();

/**
 * A list of required environment variables that the application expects to be set.
 * @type {string[]}
 */
const requiredEnvVariables: string[] = [
  'PORT',
  'DB_NAME',
  'DB_HOST',
  'DB_USER',
  'DB_PASS',
  'JWT_SECRET',
];

/**
 * Checks if all required environment variables are set.
 * @throws {Error} Throws an error if any of the required environment variables are missing.
 * @returns {void}
 */
const checkEnv = (): void => {
  requiredEnvVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Error: Environment variable ${envVar} is not defined.`);
    }
  });
};

export default checkEnv;
