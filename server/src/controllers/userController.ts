import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getUser = async (req:Request, res:Response) => {
    try {
        const userId = req.body.id as number;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    }catch(err){
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUser = async (req:Request, res:Response) => {
    try {
        const userId = req.body?.id as number;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { onboarded } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { onboarded: onboarded },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    }catch(err){
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}