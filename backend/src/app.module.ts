import { Module } from '@nestjs/common';

import { UsersController } from './controllers/User.controller';
import { UserService } from './service/User.service';
import { TodoListService } from './service/Todo_lists.service';
import { TodoListController } from './controllers/Todo_lists.controller';
import { TaskController } from './controllers/Tasks.controller';
import { TaskService } from './service/Tasks.service';

@Module({
  imports: [],
  controllers: [UsersController, TodoListController, TaskController],
  providers: [UserService, TodoListService, TaskService],
})
export class AppModule {}
