import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/nest-blog"),
    UsersModule,
    PostModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
