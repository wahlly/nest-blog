import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


export const IS_PUBLIC_KEY = "isPublic"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)


@Injectable()
export class AuthGuard implements CanActivate {
      constructor(
            private jwtService: JwtService,
            private reflector: Reflector
      ){}

      async canActivate(context: ExecutionContext): Promise<boolean> {
            //helps override auth for public routes
            const isPublic = this.reflector.getAllAndOverride<boolean>(
                  IS_PUBLIC_KEY,
                  [context.getHandler(), context.getClass()]
            )
            if(isPublic) {
                  return true
            }

            const request = context.switchToHttp().getRequest()
            const token = this.extractTokenFromHeader(request)
            if(!token) {
                  throw new UnauthorizedException()
            }

            try {
                  const payload = await this.jwtService.verifyAsync(
                        token,
                        { secret: process.env.JWT_SECRET}
                  )

                  request["payload"] = payload
            } catch (error) {
                  throw new UnauthorizedException()
            }

            return true
      }

      private extractTokenFromHeader(request: Request): string | undefined {
            const [type, token] = request.headers.authorization?.split(' ') ?? []
            return type == "Bearer" ? token : undefined
      }
}