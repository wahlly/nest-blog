import { MongooseModule } from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema"
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserSettings, UserSettingsSchema } from "src/schemas/userSettings.schema";

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
            ])
      ],
      providers: [UsersService],
      controllers: [UsersController]
})

export class UsersModule{}