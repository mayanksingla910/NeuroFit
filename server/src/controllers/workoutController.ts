import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

export const logWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const { name, image, sets, reps, time } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const loggedworkout = await prisma.loggedWorkout.create({
      data: {
        name,
        image,
        sets,
        reps,
        time,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Workout logged successfully",
      data: loggedworkout,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getLoggedWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const LoggedWorkouts = await prisma.loggedWorkout.findMany({
      where: {
        userId,
        loggedAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      orderBy: { loggedAt: "desc" },
      take: 7,
    });

    if (!LoggedWorkouts)
      return res.status(404).json({ message: "No logged workouts found" });

    return res.status(200).json({
      success: true,
      message: "Logged workouts fetched successfully",
      data: LoggedWorkouts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateLoggedWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const { id } = req.params;
    const { name, image, sets, reps, time } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const LoggedWorkout = await prisma.loggedWorkout.update({
      where: { id: Number(id), userId },
      data: {
        name,
        image,
        sets,
        reps,
        time,
      },
    });

    if (!LoggedWorkout)
      return res.status(404).json({ message: "Workout not found" });

    return res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      data: LoggedWorkout,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteLoggedWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.loggedWorkout.delete({
      where: { id: Number(id), userId: userId },
    });

    return res
      .status(200)
      .json({ success: true, message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};
