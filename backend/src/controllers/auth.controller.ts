import { Response } from "express";
import { registerDto, loginDto } from "../dtos/auth.dto";
import { registerUser, loginUser } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  findUserById,
  updateUserName,
} from "../repositories/user.repository";

/**
 * Register
 */
export const register = async (
  req: AuthRequest<{}, {}, any>,
  res: Response
) => {
  const data = registerDto.parse(req.body);

  const { token, user } = await registerUser(
    data.name,
    data.email,
    data.password
  );

  res
    .cookie("token", token, { httpOnly: true })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
};

/**
 * Login
 */
export const login = async (
  req: AuthRequest<{}, {}, any>,
  res: Response
) => {
  const data = loginDto.parse(req.body);

  const { token, user } = await loginUser(data.email, data.password);

  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
};

/**
 * Get current user
 */
export const me = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await findUserById(req.userId!);
  res.json(user);
};

/**
 * Update profile
 */
export const updateProfile = async (
  req: AuthRequest<{}, {}, { name: string }>,
  res: Response
) => {
  const { name } = req.body;

  const user = await updateUserName(req.userId!, name);
  res.json(user);
};
