import { Router } from 'express';
import User from '../models/User.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/', async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json({ users });
});

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-passwordHash');
  res.json({ user });
});

router.post('/:id/reset-password', async (req, res) => {
  // For demo: set password to 'password123'
  const { id } = req.params;
  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.default.hash('password123', 10);
  await User.findByIdAndUpdate(id, { passwordHash });
  res.json({ ok: true });
});

export default router;
