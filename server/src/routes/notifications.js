import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import Notification from '../models/Notification.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const list = await Notification.find({ userId: req.user.id, read: false }).sort({ createdAt: -1 });
  res.json({ notifications: list });
});

router.post('/', authenticate, async (req, res) => {
  const { userId, type, message } = req.body;
  const note = await Notification.create({ userId: userId || req.user.id, type, message });
  res.status(201).json({ notification: note });
});

router.post('/:id/read', authenticate, async (req, res) => {
  const { id } = req.params;
  const note = await Notification.findOneAndUpdate({ _id: id, userId: req.user.id }, { read: true }, { new: true });
  if (!note) return res.status(404).json({ message: 'Not found' });
  res.json({ notification: note });
});

export default router;
