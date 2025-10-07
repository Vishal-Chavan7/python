import { Router } from 'express';
import multer from 'multer';
import { authenticate, requireRole } from '../middleware/auth.js';
import Property from '../models/Property.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Public listings
router.get('/', async (req, res) => {
  const { type, location, minRent, maxRent, available } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (location) filter.location = new RegExp(location, 'i');
  if (available !== undefined) filter.isAvailable = available === 'true';
  if (minRent || maxRent) filter.rent = { ...(minRent && { $gte: Number(minRent) }), ...(maxRent && { $lte: Number(maxRent) }) };
  const properties = await Property.find(filter).sort({ createdAt: -1 });
  res.json({ properties });
});

router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Not found' });
  res.json({ property });
});

// Landlord CRUD
router.post('/', authenticate, requireRole('landlord'), upload.array('images', 5), async (req, res) => {
  const landlordId = req.user.id;
  const { title, description, type, location, rent } = req.body;
  const images = (req.files || []).map(f => `/uploads/${f.filename}`);
  const property = await Property.create({ landlordId, title, description, type, location, rent, images });
  res.status(201).json({ property });
});

router.get('/mine/list', authenticate, requireRole('landlord'), async (req, res) => {
  const properties = await Property.find({ landlordId: req.user.id }).sort({ createdAt: -1 });
  res.json({ properties });
});

router.patch('/:id', authenticate, requireRole('landlord', 'admin'), async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const property = await Property.findOneAndUpdate(
    { _id: id, ...(req.user.role === 'landlord' ? { landlordId: req.user.id } : {}) },
    update,
    { new: true }
  );
  if (!property) return res.status(404).json({ message: 'Not found' });
  res.json({ property });
});

router.delete('/:id', authenticate, requireRole('landlord', 'admin'), async (req, res) => {
  const { id } = req.params;
  const property = await Property.findOneAndDelete({ _id: id, ...(req.user.role === 'landlord' ? { landlordId: req.user.id } : {}) });
  if (!property) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

export default router;
