import { Injectable } from '@nestjs/common';

import { knex } from '../knex/database';

export interface TodoList {
  uuid: string;
  user_uuid: string;
  name: string;
  created_at: Date;
}

@Injectable()
export class TodoListService {
  static tableName = 'todo_lists';

  /**
   * Finds a todo list using its id.
   * @param {string} id Id of the todo list to find
   * @returns {Promise<TodoList | null>} Returns the todo list or null
   */
  static async findOneById(id: string): Promise<TodoList | null> {
    const todoList = await knex<TodoList>(TodoListService.tableName).where({ uuid: id }).first();

    return todoList || null;
  }

  /**
   * Finds todo lists using the user's id.
   * @param {string} userId Id of the user
   * @returns {Promise<TodoList[]>} Returns the list of todo lists
   */
  static async findByUserId(userId: string): Promise<TodoList[]> {
    const todoLists = await knex<TodoList>(TodoListService.tableName).where({ user_uuid: userId });

    return todoLists;
  }

  /**
   * Deletes a todo list
   * @param {string} id Id of the todo list to remove
   * @returns {Promise<number>} Returns 1 or 0 if not found
   */
  static async deleteOneById(id: string): Promise<number> {
    await knex('tasks').where({ list_id: id }).del();
    const result = await knex(TodoListService.tableName).where({ uuid: id }).del();

    return result;
  }

  /**
   * Creates a todo list.
   * @param {TodoList} payload Object containing todo list's data
   * @returns {TodoList} Returns the created todo list
   */
  static async create(payload: TodoList): Promise<TodoList> {
    await knex(TodoListService.tableName).insert(payload);
    return payload;
  }

  /**
   * Updates a todo list.
   * @param {string} id Id of the todo list to update
   * @param {Partial<TodoList>} payload Object containing the todo list's updated data
   * @returns {Promise<void>} Returns nothing
   */
  static async update(id: string, payload: Partial<TodoList>): Promise<void> {
    await knex(TodoListService.tableName).where({ uuid: id }).update(payload);
  }
}
