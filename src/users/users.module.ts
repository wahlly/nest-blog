import { MongooseModule } from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema"
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserSettings, UserSettingsSchema } from "src/schemas/userSettings.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
      imports: [
            MongooseModule.forFeature([
                  {
                        name: User.name,
                        schema: UserSchema
                  },
                  {
                        name: UserSettings.name,
                        schema: UserSettingsSchema
                  }
            ]),
            JwtModule.register({
                  global: true,
                  secret: process.env.JWT_SECRET
            }),
            signOptions: {expiresIn: 180}
      ],
      providers: [UsersService],
      controllers: [UsersController]
})

export class UsersModule{}