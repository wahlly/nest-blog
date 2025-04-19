import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dtos/CreatePost.dto";

@Controller("posts")
export class PostsController {
      constructor(private postService: PostsService) {}

      @Post()
      @UsePipes(new ValidationPipe)
      createPost(@Body() createPostDto: CreatePostDto) {
            this.postService.createPost(createPostDto)
      }
}