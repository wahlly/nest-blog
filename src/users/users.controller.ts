import {Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller("users")
export class UsersController {
      constructor(private userService: UsersService) {}

      @Post()
      @UsePipes(new ValidationPipe())
      createUser(@Body() createUserdto: CreateUserDto) {
            console.log(createUserdto)
            return this.userService.createUser(createUserdto)
      }

      @Get()
      getUser() {
            return this.userService.getUsers()
      }

      @Get(":id")
      async getUserById(@Param("id") id: string) {
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if (!isValid) throw new HttpException("User not found", 404)
            const user = await this.userService.getUserById(id)
            if (!user) {
                  throw new HttpException("User not found", 404)
            }

            return user
      }

      @Patch(":id")
      @UsePipes(new ValidationPipe())
      async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if (!isValid) throw new HttpException('Invalid ID', 400)

            const updatedUser = await this.userService.updateUser(id, updateUserDto)
            if (!updatedUser) throw new HttpException('User not found', 404)

            return updatedUser
      }

      @Delete(":id")
      async deleteUser(@Param("id") id: string) {
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if(!isValid) throw new HttpException("Invalid ID", 400)
            
            const deletedUser = await this.userService.deleteUser(id)
            if(!deletedUser) throw new HttpException("User not found", 404)

            return deletedUser
      }
}
