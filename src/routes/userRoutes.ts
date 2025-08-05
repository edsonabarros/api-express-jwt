import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post("/", (req: Request, res: Response) => {
  const { name, username, password, checkPassword, userType } = req.body;
  userRepository.create(name, username, password, checkPassword, userType);
  res.status(201).send();
});

userRoutes.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = userRepository.findByUsername(username);
  if (!user) {
    return undefined;
  }

  if (await compare(password, user.password)) {
    const token = jwt.sign(
      { id: user.id },
      "PbPnyUgQkdGWUS1ufd3TMsHKmkxBXVvX9e8DD2mqUAv",
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json(token);
  } else {
    return res.status(404).json({ message: "User não encontrado" });
  }
});

userRoutes.use(auth);

userRoutes.get("/", (req: Request, res: Response) => {
  const users = userRepository.listAll();

  res.status(200).json(users).send();
});

userRoutes.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedUser = userRepository.update(id, name);

  if (!updatedUser) {
    return res.status(404).json("Id não encontrado");
  }

  return res.status(200).json(updatedUser);
});

userRoutes.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = userRepository.delete(id);

  if (!deletedUser) {
    return res.status(404).json("Id não encontrado");
  }
  res.status(204).send();
});

export { userRoutes };
