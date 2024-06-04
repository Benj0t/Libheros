import { Injectable } from '@nestjs/common';

import { knex } from '../knex/database';
import { hashPassword } from '../utils/password';
import userCreateSchema from '../yupSchemas/userCreateSchema';

// Interface used to define User table fields.
export interface User {
  uuid: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

@Injectable()
export class UserService {
  static tableName = 'users';

  /**
   * Finds an user using its id.
   * @param {string} id Id of the user to find
   * @returns {Promise<User | null>} Returns the user or null
   */
  static async findOneById(id: string): Promise<User | null> {
    const user = await knex<User>(UserService.tableName).where({ uuid: id }).first();

    return user || null;
  }

  /**
   * Finds an user using its EMAIL.
   * @param {string} email mail of the user to find
   * @returns {Promise<User | null>} Returns the user or null
   */
  static async findOneByEmail(email: string): Promise<User | null> {
    const user = await knex<User>(UserService.tableName).where({ email }).first();

    return user || null;
  }

  /**
   * Finds an user using its username.
   * @param {string} username username of the user to find
   * @returns {Promise<User | null>} Returns the user or null
   */
  static async findOneByUsername(username: string): Promise<User | null> {
    const user = await knex<User>(UserService.tableName).where({ username }).first();

    return user || null;
  }

  /**
   * Deletes an user
   * @param {string} id id of the user to remove
   * @returns {Promise<number>} Returns 1 or 0 if not found
   */
  static async deleteOneById(id: string): Promise<number> {
    const result = await knex(UserService.tableName).where({ uuid: id }).del();

    return result;
  }

  /**
   * Creates an user.
   * @param {User} payload object containing user's datas
   * @returns {User} Returns User if not created
   */
  static async create(payload: User): Promise<User> {
    await userCreateSchema.validate(payload);

    const sanitizedPayload = {
      // Sanitize payload
      ...payload,
      email: payload.email.toLowerCase(),
      username: payload.username.toLowerCase(),
      firstname: payload.firstname.toLowerCase(),
      lastname: payload.lastname.toLowerCase(),
      password: await hashPassword(payload.password),
    };

    await knex(UserService.tableName).insert(sanitizedPayload);

    return payload;
  }
}
