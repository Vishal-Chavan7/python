import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import Application from '../models/Application.js';

const router = Router();

// Tenant applies
router.post('/', authenticate, requireRole('tenant'), async (req, res) => {
  const { propertyId, message } = req.body;
  const existing = await Application.findOne({ tenantId: req.user.id, propertyId });
  if (existing) return res.status(400).json({ message: 'Already applied' });
  const application = await Application.create({ tenantId: req.user.id, propertyId, message });
  res.status(201).json({ application });
});

// Tenant list own applications
router.get('/mine', authenticate, requireRole('tenant'), async (req, res) => {
  const list = await Application.find({ tenantId: req.user.id }).sort({ createdAt: -1 });
  res.json({ applications: list });
});

// Landlord sees applications to their properties
router.get('/incoming', authenticate, requireRole('landlord'), async (req, res) => {
  const list = await Application.aggregate([
    { $lookup: { from: 'properties', localField: 'propertyId', foreignField: '_id', as: 'property' } },
    { $unwind: '$property' },
    { $match: { 'property.landlordId': req.user.id } },
    { $sort: { createdAt: -1 } }
  ]);
  res.json({ applications: list });
});

// Landlord updates status
router.patch('/:id/status', authenticate, requireRole('landlord'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const app = await Application.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ application: app });
});

export default router;
