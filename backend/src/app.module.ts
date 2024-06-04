import { Module } from '@nestjs/common';

import { UsersController } from './controllers/User.controller';
import { UserService } from './service/User.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
