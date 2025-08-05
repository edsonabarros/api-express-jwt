import { randomInt } from "crypto";
import { User } from "../models/user";
import { compare, hash } from "bcrypt";
import { request } from "http";

export class UserRepository {
  users: User[] = [];

  async create(
    name: string,
    username: string,
    password: string,
    checkPassword: string,
    userType: string
  ) {
    if (this.valPassword(password, checkPassword)) {
      const passwordHash = await this.encrypt(password);
      const user = new User(name, username, passwordHash, userType);
      this.users.push(user);
    }
  }

  listAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  update(id: string, name: string): User | undefined {
    const user = this.findById(id);

    if (!user) {
      return undefined;
    }
    user.name = name;

    return user;
  }

  delete(id: string): User | undefined {
    const user = this.findById(id);

    if (!user) {
      return undefined;
    }
    user.deletedAt = new Date();
    user.status = "deleted";
  }

  async encrypt(password: string) {
    const randomSalt = randomInt(10, 16);
    const passwordHash = await hash(password, randomSalt);

    return passwordHash;
  }

  valPassword(password: string, checkPassword: string): boolean {
    return password === checkPassword;
  }
}
