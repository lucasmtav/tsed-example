
import {BodyParams, Controller, Get, HeaderParams, Inject, Post, Req} from "@tsed/common";
import {Conflict} from '@tsed/exceptions';
import {Authenticate, Authorize} from "@tsed/passport";
import {Returns} from "@tsed/schema";
import {genSalt, hash} from 'bcrypt';
import {Credential} from "../../models/Credential";
import {User} from "../../models/User";
import {UsersService} from "../../services/UsersService";

@Controller("/auth")
export class PassportController {
  @Inject()
  usersService: UsersService;

  @Post("/login")
  @Authenticate("local")
  @Returns(200, User)
  @Returns(400).Description("Validation error")
  async login(@Req() req: Req, @BodyParams() credentials: Credential) {
    return req.user;
  }

  @Post("/signup")
  @Returns(201, User)
  async signup(@Req() req: Req, @BodyParams() user: User) {
    try {
      const hasUser = await this.usersService.findOne({ email: user.email })

      if(hasUser) throw new Conflict('E-mail already registered')

      const password = await hash(user.password, await genSalt(10))
      Object.assign(user, { password })
      await this.usersService.create(user)
      return
    } catch (err) {
      throw err;
    }
  }

  @Get("/whoami")
  @Authorize("jwt")
  @Returns(200, User)
  whoAmI(@Req() req: Req, @HeaderParams("authorization") token: string){
    return req.user;
  }

  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

}
