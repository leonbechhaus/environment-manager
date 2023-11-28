import { type Document } from "mongoose";

interface UserDoc extends Document {
  name: string;
  password: string;
}

interface RootUser {
  name: string;
  password: string;
}

export type { UserDoc, RootUser };
