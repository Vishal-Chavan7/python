import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

router.post('/signup',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['tenant', 'landlord']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }
);

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isActive) return res.status(403).json({ message: 'Account deactivated' });
    user.lastLoginAt = new Date();
    await user.save();
    const token = signToken(user);
    res.cookie(process.env.COOKIE_NAME || 'token', token, { httpOnly: true, sameSite: 'lax' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }
);

router.post('/logout', async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'token');
  return res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  const token = req.cookies?.[process.env.COOKIE_NAME || 'token'];
  if (!token) return res.json({ user: null });
  try {
    const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    return res.json({ user: null });
  }
});

export default router;
