import {Inject, Service} from "@tsed/di";
import {MongooseModel, MongooseService} from "@tsed/mongoose";
import {User} from "../models/User";
@Service()
export class UsersService extends MongooseService {
  @Inject(User)
  private User: MongooseModel<User>;

  async create(user: User): Promise<User> {
    return this.User.create(user);
  }

  async findOne(query: any, options: any={}): Promise<User | null> {
    return this.User.findOne(query, options).lean();
  }

  async findOneForLogin(query: any): Promise<User | null> {
    return this.User.findOne(query).select("+password");
  }

  attachToken(user: User, token: string) {
    const userWithToken = Object.assign(user, {token: token});
    return userWithToken
  }
}
