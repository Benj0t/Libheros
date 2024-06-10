import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TodoList, TodoListService } from '../service/Todo_lists.service';
import { YupValidationPipe } from '../pipes/YupValidationPipe';
import todoListSchema from '../yupSchemas/todoListSchema';
import { AuthGuard } from '../guards/auth.guard';
import { RequestCtx } from '../types/auth';

@Controller('todo-lists')
export class TodoListController {
  @Get(':id')
  async getTodoList(@Param('id') id: string): Promise<TodoList | null> {
    return TodoListService.findOneById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTodoListsByUser(@Request() req: RequestCtx): Promise<TodoList[]> {
    return TodoListService.findByUserId(req.userId);
  }

  @Post()
  @UsePipes(new YupValidationPipe(todoListSchema))
  @UseGuards(AuthGuard)
  async createTodoList(@Request() req: RequestCtx, @Body() todoList: TodoList): Promise<TodoList> {
    const payload = {
      ...todoList,
      uuid: uuidv4(),
      user_uuid: req.userId,
    };

    const isDuplicate = await TodoListService.findIsDuplicate(req.userId, todoList.name);

    if (isDuplicate) {
      throw new BadRequestException('Name already used');
    }
    return TodoListService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTodoList(
    @Param('id') id: string,
    @Body() todoList: Partial<TodoList>,
  ): Promise<void> {
    await TodoListService.update(id, todoList);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTodoList(@Param('id') id: string): Promise<number> {
    return TodoListService.deleteOneById(id);
  }
}
