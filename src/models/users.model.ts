import { Schema, type Model, model, models } from "mongoose";
import { type RootUser, type UserDoc } from "~/types/user-interface";
import UsersSchema from "./schemas/users.schema";

interface UserModel extends Model<RootUser> {
  build(attr: RootUser): UserDoc;
}

const usersSchema = new Schema<RootUser, Model<RootUser>>({
  ...UsersSchema,
});

const existingUsers: Model<RootUser> | [] | undefined = models.Users;

const Users = () =>
  existingUsers ?? model<RootUser, UserModel>("Users", usersSchema);

export default Users;
