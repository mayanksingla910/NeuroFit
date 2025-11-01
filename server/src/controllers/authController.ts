import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "../types/auth.js";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid email or password" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { userId: user.id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const base = email.split("@")[0];
    const randomSuffix = crypto.randomBytes(2).toString("hex");
    const username = `${base}_${randomSuffix}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Signup successful",
      data: { userId: user.id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
