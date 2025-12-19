import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository";
import { signToken } from "../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken({ userId: user.id });

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ userId: user.id });

  return { token, user };
};
