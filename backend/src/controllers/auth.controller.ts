import { Request, Response } from "express";
import { registerDto, loginDto } from "../dtos/auth.dto";
import { registerUser, loginUser } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  findUserById,
  updateUserName,
} from "../repositories/user.repository";

export const register = async (req: Request, res: Response) => {
  const data = registerDto.parse(req.body);

  const { token, user } = await registerUser(
    data.name,
    data.email,
    data.password
  );

  res
    .cookie("token", token, { httpOnly: true })
    .status(201)
    .json({ id: user.id, name: user.name, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const data = loginDto.parse(req.body);

  const { token, user } = await loginUser(data.email, data.password);

  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .json({ id: user.id, name: user.name, email: user.email });
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = await findUserById(req.userId!);
  res.json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const user = await updateUserName(req.userId!, name);
  res.json(user);
};
