import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';

const router = Router();

router.post('/', authenticate, requireRole('tenant'), async (req, res) => {
  const { propertyId, title, description } = req.body;
  const reqDoc = await MaintenanceRequest.create({ tenantId: req.user.id, propertyId, title, description });
  res.status(201).json({ request: reqDoc });
});

router.get('/mine', authenticate, requireRole('tenant'), async (req, res) => {
  const list = await MaintenanceRequest.find({ tenantId: req.user.id }).sort({ createdAt: -1 });
  res.json({ requests: list });
});

router.get('/incoming', authenticate, requireRole('landlord'), async (req, res) => {
  const list = await MaintenanceRequest.aggregate([
    { $lookup: { from: 'properties', localField: 'propertyId', foreignField: '_id', as: 'property' } },
    { $unwind: '$property' },
    { $match: { 'property.landlordId': req.user.id } },
    { $sort: { createdAt: -1 } }
  ]);
  res.json({ requests: list });
});

router.patch('/:id/status', authenticate, requireRole('landlord', 'admin'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'in_progress', 'completed'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const updated = await MaintenanceRequest.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ request: updated });
});

export default router;
