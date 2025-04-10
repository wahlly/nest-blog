import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/nest-blog"),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
