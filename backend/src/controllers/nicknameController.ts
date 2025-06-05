import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schemas
const createNicknameSchema = z.object({
  nickname: z.string()
    .min(3, 'Nickname debe tener al menos 3 caracteres')
    .max(20, 'Nickname no puede exceder 20 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Solo se permiten letras, números, guiones y guiones bajos')
});

const updateNicknameSchema = z.object({
  nickname: z.string()
    .min(3, 'Nickname debe tener al menos 3 caracteres')
    .max(20, 'Nickname no puede exceder 20 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Solo se permiten letras, números, guiones y guiones bajos')
    .optional(),
  isActive: z.boolean().optional()
});

// GET /api/nicknames - Obtener todos los nicknames
export const getNicknames = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', search = '' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string))); // Limit max to 50
    const skip = (pageNum - 1) * limitNum;

    const where = search
      ? { nickname: { contains: search as string, mode: 'insensitive' as const } }
      : {};

    const [nicknames, total] = await Promise.all([
      prisma.nickname.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.nickname.count({ where })
    ]);

    res.json({
      data: nicknames,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching nicknames:', error);
    res.status(500).json({ error: 'Error al obtener nicknames' });
  }
};

// POST /api/nicknames - Crear nuevo nickname
export const createNickname = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = createNicknameSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: 'Datos inválidos',
        details: validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const { nickname } = validation.data;

    // Verificar si ya existe 
    const existingNickname = await prisma.nickname.findUnique({
      where: { nickname: nickname.toLowerCase() } // Store in lowercase for consistency
    });

    if (existingNickname) {
      res.status(409).json({ error: 'El nickname ya existe' });
      return;
    }

    const newNickname = await prisma.nickname.create({
      data: { 
        nickname: nickname.toLowerCase(),
        isActive: true // Set default active state
      }
    });

    res.status(201).json(newNickname);
  } catch (error: any) {
    console.error('Error creating nickname:', error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'El nickname ya existe' });
      return;
    }
    
    res.status(500).json({ error: 'Error al crear nickname' });
  }
};

// PUT /api/nicknames/:id - Actualizar nickname
export const updateNickname = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const nicknameId = parseInt(id);

    if (isNaN(nicknameId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const validation = updateNicknameSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: 'Datos inválidos',
        details: validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    const updateData = validation.data;
    
    // If updating nickname, convert to lowercase and check uniqueness
    if (updateData.nickname) {
      updateData.nickname = updateData.nickname.toLowerCase();
      
      const existingNickname = await prisma.nickname.findFirst({
        where: { 
          nickname: updateData.nickname,
          id: { not: nicknameId }
        }
      });

      if (existingNickname) {
        res.status(409).json({ error: 'El nickname ya existe' });
        return;
      }
    }

    const updatedNickname = await prisma.nickname.update({
      where: { id: nicknameId },
      data: updateData
    });

    res.json(updatedNickname);
  } catch (error: any) {
    console.error('Error updating nickname:', error);
    
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Nickname no encontrado' });
      return;
    }
    
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'El nickname ya existe' });
      return;
    }
    
    res.status(500).json({ error: 'Error al actualizar nickname' });
  }
};

// DELETE /api/nicknames/:id - Eliminar nickname 
export const deleteNickname = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const nicknameId = parseInt(id);

    if (isNaN(nicknameId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    await prisma.nickname.delete({
      where: { id: nicknameId }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting nickname:', error);
    
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Nickname no encontrado' });
      return;
    }
    
    res.status(500).json({ error: 'Error al eliminar nickname' });
  }
};

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});