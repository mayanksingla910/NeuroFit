import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as number;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await prisma.profile.findFirst({
      where: { userId: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postProfile = async (req: Request, res: Response) => {
  const {
    age,
    gender,
    height,
    heightParam,
    weight,
    weightParam,
    activityLevel,
    goal,
    diet,
    allergies,
    description,
  } = req.body;

  try {
    const userId = req.body.userId as number;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isOnboarded = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboarded: true },
    });

    if (isOnboarded) {
      return res.status(401).json({ message: "User already onboarded" });
    }

    const profile = await prisma.profile.create({
      data: {
        userId: userId,
        age: age,
        gender: gender,
        height: height,
        heightParam: heightParam,
        weight: weight,
        weightParam: weightParam,
        activityLevel: activityLevel,
        goal: goal,
        diet: diet,
        allergies: allergies,
        description: description,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const {
    age,
    gender,
    height,
    heightParam,
    weight,
    weightParam,
    activityLevel,
    goal,
    diet,
    allergies,
    description,
  } = req.body;

  try {
    const userId = req.body.userId as number;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingProfile = await prisma.profile.findFirst({
      where: { userId: userId },
    });

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const profile = await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        age: age,
        gender: gender,
        height: height,
        heightParam: heightParam,
        weight: weight,
        weightParam: weightParam,
        activityLevel: activityLevel,
        goal: goal,
        diet: diet,
        allergies: allergies,
        description: description,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
