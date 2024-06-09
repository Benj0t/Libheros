import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskService } from '../service/Tasks.service';
import { YupValidationPipe } from '../pipes/YupValidationPipe';
import taskSchema from '../yupSchemas/taskSchema';

@Controller('tasks')
export class TaskController {
  @Get(':id')
  async getTask(@Param('id') id: string): Promise<Task | null> {
    return TaskService.findOneById(id);
  }

  @Get('todo-list/:todoListId')
  async getTasksByTodoList(@Param('todoListId') todoListId: string): Promise<Task[]> {
    return TaskService.findByTodoListId(todoListId);
  }

  @Post()
  @UsePipes(new YupValidationPipe(taskSchema))
  async createTask(@Body() task: Task): Promise<Task> {
    return TaskService.create({
      ...task,
      uuid: uuidv4(),
      finished: false,
    });
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() task: Partial<Task>): Promise<void> {
    await TaskService.update(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<number> {
    return TaskService.deleteOneById(id);
  }
}
