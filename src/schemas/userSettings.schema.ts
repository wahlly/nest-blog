import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class UserSettings {
      @Prop({ required: false })
      reveiveNotifications?: boolean

      @Prop({ required: false })
      receiveEmail?: boolean

      @Prop({ required: false })
      reveiveSMS?: boolean
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings)