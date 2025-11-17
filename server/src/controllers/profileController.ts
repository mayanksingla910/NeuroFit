import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: number };
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const profile = await prisma.profile.findFirst({
      where: { userId },
    });

    return res.status(200).json({
      success: true,
      profile: profile || null,
    });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ------------------------------------------------------
   CREATE PROFILE (Onboarding submit)
------------------------------------------------------ */
export const postProfile = async (req: AuthRequest, res: Response) => {
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboarded: true }
    });

    if (existingUser?.onboarded) {
      return res.status(400).json({ 
        success: false,
        message: "User already onboarded"
      });
    }

    await prisma.profile.create({
      data: {
        userId,
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
      },
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
    });
  } catch (err) {
    console.error("POST PROFILE ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ------------------------------------------------------
   UPDATE PROFILE
------------------------------------------------------ */
export const updateProfile = async (req: AuthRequest, res: Response) => {
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existingProfile = await prisma.profile.findFirst({
      where: { userId },
    });

    if (!existingProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
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
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
