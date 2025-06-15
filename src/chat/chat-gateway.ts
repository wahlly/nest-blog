import {
      MessageBody,
      OnGatewayConnection,
      OnGatewayDisconnect,
      SubscribeMessage,
      WebSocketGateway,
      WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
      @WebSocketServer() server: Server
      @SubscribeMessage("newMessage")
      chatMessage(client: Socket, data: any) {
            console.log(data)
            //emit to a single client
            client.emit("response", "hiiii")

            //braodcast to every connected clients
            this.server.emit("response", "broadcasting...")
      }

      handleConnection(client: any, ...args: any[]) {
            console.log("new user connected", client.id)

            this.server.emit(`User joined the chat: ${client.id}`)
      }

      handleDisconnect(client: any) {
            console.log("user disconnected", client.id)

            this.server.emit(`User left the chat: ${client.id}`)
      }
}