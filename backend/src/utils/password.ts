import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Generate hashed password from a plain text password
 * @param {string} plainTextPassword - Plain text password
 * @returns {string} hashedPassword
 */
export const hashPassword = async (plainTextPassword: string): Promise<string> => {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
};

/**
 * Verify plainTextPassword against his hash.
 * @param {string} plainTextPassword - Plain text password
 * @param {string} hash - Hash password
 * @returns {boolean} Whether the plainTextPassword matches the hashedPassword.
 */
export const verifyPassword = async (plainTextPassword: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hash);
};
