import {Model, ObjectID, Select} from "@tsed/mongoose";
import {Description, Format, Property, Required} from "@tsed/schema";
import {compare} from 'bcrypt';

@Model()
export class User {

  @ObjectID("id")
  _id: string;

  @Description("User first name")
  @Required()
  first_name: string;

  @Description("User last name")
  @Required()
  last_name: string;

  @Description("User email")
  @Format("email")
  @Required()
  email: string;

  @Description("User password")
  @Required()
  @Select(false)
  password: string;

  @Description("Creation date")
  @Property()
  created_at: Date = new Date();

  async verifyPassword(password: string) {
    return compare(password, this.password)
    // return this.password === password;
  }
}
