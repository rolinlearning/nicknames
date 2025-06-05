// At the top of nicknameRoutes.ts
console.log('Loading nickname routes...');

// Before each import
console.log('Importing controllers...');

import { Router } from 'express';
import { 
  getNicknames, 
  createNickname, 
  updateNickname, 
  deleteNickname 
} from '../controllers/nicknameController';

console.log('Controllers imported successfully');


const router = Router();

// GET /api/nicknames - Get all nicknames with pagination and search
router.get('/', getNicknames);

// POST /api/nicknames - Create new nickname
router.post('/', createNickname);

// PUT /api/nicknames/:id - Update nickname
router.put('/:id', updateNickname);

// DELETE /api/nicknames/:id - Delete nickname
router.delete('/:id', deleteNickname);

export default router;