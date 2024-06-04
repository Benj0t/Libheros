import { Module } from '@nestjs/common';
import { UsersController } from './controllers/UserController';
import { UserService } from './service/User.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
