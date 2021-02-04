import {Inject, Injectable} from "@tsed/di";
import {MongooseModel} from "@tsed/mongoose";
import {User} from "../models/User";

@Injectable()
export class UsersService {
  @Inject(User)
  private User: MongooseModel<User>;

  async create(user: User): Promise<User> {
    return await this.User.create(user);
  }

  async findOne(query: any): Promise<User | null> {
    const user = await this.User.findOne(query);
    return user;
  }

  attachToken(user: User, token: string) {
    const userWithToken = Object.assign(user, {token: token});
    return userWithToken
  }
}
