import {Model, ObjectID} from "@tsed/mongoose";
import {Description, Format, Required} from "@tsed/schema";
import {Credential} from "./Credential";

@Model()
export class User extends Credential {

  @ObjectID("id")
  _id: string;

  @Description("User first name")
  @Required()
  firstName: string;

  @Description("User last name")
  @Required()
  lastName: string;

  @Description("User email")
  @Format("email")
  @Required()
  email: string;

  @Description("User password")
  @Required()
  password: string;

  verifyPassword(password: string) {
    return this.password === password;
  }
}
