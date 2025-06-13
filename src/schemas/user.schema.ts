import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./userSettings.schema";
import { Post } from "./post.schema";


@Schema()
export class User {
      @Prop({ unique: true, required: true })
      username: string;

      displayName?: string;

      password: string;

      avatarUrl?: string;

      @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "UserSettings" })
      settings?: UserSettings

      @Prop({ type: [{type: mongoose.Types.ObjectId, ref: "Post" }]})
      posts: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User)