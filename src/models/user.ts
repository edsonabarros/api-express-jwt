import { randomUUID } from "node:crypto";

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  userType: string;
  deletedAt?: Date;
  status: string;

  constructor(
    name: string,
    username: string,
    password: string,
    userType: string
  ) {
    this.id = randomUUID();
    this.name = name;
    this.username = username;
    this.password = password;
    this.userType = userType;
    this.status = "created";
  }
}
