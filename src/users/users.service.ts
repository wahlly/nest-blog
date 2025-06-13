import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, set } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSettings } from "src/schemas/userSettings.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"


@Injectable()
export class UsersService {
      constructor(
            @InjectModel(User.name) private userModel: Model<User>,
            @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
            private jwtService: JwtService
      ) {}

      async createUser({ settings, ...createUserDto }: CreateUserDto) {
            const hash = await bcrypt.hash(createUserDto.password, 10)
            if(settings) {
                  let newSettings = new this.userSettingsModel(settings)
                  newSettings = await newSettings.save()
                  const newUser = new this.userModel({...createUserDto, password: hash, settings: newSettings._id});
                  return newUser.save();
            }

            const newUser = new this.userModel({...createUserDto, password: hash});
            return newUser.save();
      }

      getUsers() {
            return this.userModel.find().populate(["settings", "posts"])
      }

      getUserById(id: string) {
            return this.userModel.findById(id)
      }

      updateUser(id: string, updateUserDto: UpdateUserDto) {
            return this.userModel.findByIdAndUpdate(id, updateUserDto)
      }

      deleteUser(id: string) {
            return this.userModel.findByIdAndDelete(id)
      }

      async userSignIn(username: string, password: string): Promise<any> {
            const user = await this.userModel.findOne({ username })
            if(!user) {
                  throw new Error("Username/password is incorrect")
            }

            //compare password
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch) {
                  throw new Error("Username/password is incorrect")
            }

            const payload = {id: user._id, email: user.username}
            const token = await this.jwtService.signAsync(payload)

            return {token}
      }
}