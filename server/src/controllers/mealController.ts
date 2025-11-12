import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { success } from "zod";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: number };
}

export const logMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, calories, carbs, protein, fat } = req.body;
    const userId = req.user?.id as number;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newMeal = await prisma.loggedMeal.create({
      data: {
        userId,
        name,
        description,
        calories,
        carbs,
        protein,
        fat,
      },
    });
    return res
      .status(201)
      .json({
        success: true,
        message: "Meal Logged Successfully",
        data: newMeal,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLoggedMeals = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const LoggedMeals = await prisma.loggedMeal.findMany({
      where: {
        userId,
        loggedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      orderBy: { loggedAt: "desc" },
      take: 7,
    });

    if (!LoggedMeals)
      return res.status(404).json({ message: "No logged meals found" });

    return res.status(200).json(LoggedMeals);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLoggedMeal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const deletedMeal = await prisma.loggedMeal.delete({
      where: { id: Number(id), userId: userId },
    });

    return res.status(200).json({success: true, message: "Meal deleted successfully",});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLoggedMeal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const { id } = req.params;
    const { name, description, calories, carbs, protein, fat } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedMeal = await prisma.loggedMeal.update({
      where: { id: Number(id), userId: userId },
      data: {
        name,
        description,
        calories,
        carbs,
        protein,
        fat,
      },
    });

    return res.status(200).json({ success: true, message: "Meal updated successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
