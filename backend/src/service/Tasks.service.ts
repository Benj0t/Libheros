import { Injectable } from '@nestjs/common';

import { knex } from '../knex/database';

export interface Task {
  uuid: string;
  table_id: string;
  name: string;
  description_short: string;
  description_long?: string;
  deadline: number;
  created_at: number;
  finished: boolean;
}

@Injectable()
export class TaskService {
  static tableName = 'tasks';

  /**
   * Finds a task using its id.w
   * @param {string} id Id of the task to find
   * @returns {Promise<Task | null>} Returns the task or null
   */
  static async findOneById(id: string): Promise<Task | null> {
    const task = await knex<Task>(TaskService.tableName).where({ uuid: id }).first();

    return task || null;
  }

  /**
   * Finds tasks using the todo list id.
   * @param {string} todoListId Id of the todo list
   * @returns {Promise<Task[]>} Returns the list of tasks
   */
  static async findByTodoListId(todoListId: string): Promise<Task[]> {
    const tasks = await knex<Task>(TaskService.tableName).where({ table_id: todoListId });

    return tasks;
  }

  /**
   * Deletes a task
   * @param {string} id Id of the task to remove
   * @returns {Promise<number>} Returns 1 or 0 if not found
   */
  static async deleteOneById(id: string): Promise<number> {
    const result = await knex(TaskService.tableName).where({ uuid: id }).del();

    return result;
  }

  /**
   * Creates a task.
   * @param {Task} payload Object containing task's data
   * @returns {Task} Returns the created task
   */
  static async create(payload: Task): Promise<Task> {
    await knex(TaskService.tableName).insert(payload);
    return payload;
  }

  /**
   * Updates a task.
   * @param {string} id Id of the task to update
   * @param {Partial<Task>} payload Object containing the task's updated data
   * @returns {Promise<void>} Returns nothing
   */
  static async update(id: string, payload: Partial<Task>): Promise<void> {
    await knex(TaskService.tableName).where({ uuid: id }).update(payload);
  }
}

export default new TaskService();
