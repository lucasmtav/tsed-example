
import {BodyParams, Controller, Get, HeaderParams, Inject, Post, Req} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {Returns} from "@tsed/schema";
import _ from "lodash";
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
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Returns(201, User)
  async signup(@Req() req: Req, @BodyParams() user: User) {
    const newUser = await this.usersService.create(user)
    // FACADE
    return _.omit(newUser, 'password');
  }

  @Get("/whoiam")
  @Authorize("jwt")
  @Returns(200, User)
  whoIAm(@Req() req: Req, @HeaderParams("authorization") token: string){
    // FACADE
    return req.user;
  }

  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

}
