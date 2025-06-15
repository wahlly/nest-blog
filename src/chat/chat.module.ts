import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateway';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';

@Module({
      providers: [ChatGateway]
})
export class ChatModule {}
