import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/UserController';
import { UserModel } from './models/User.model';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UserModel],
})
export class AppModule {}
