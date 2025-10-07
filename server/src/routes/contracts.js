import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import Contract from '../models/Contract.js';

const router = Router();

router.get('/tenant', authenticate, requireRole('tenant'), async (req, res) => {
  const list = await Contract.find({ tenantId: req.user.id }).sort({ createdAt: -1 });
  res.json({ contracts: list });
});

router.get('/landlord', authenticate, requireRole('landlord'), async (req, res) => {
  const list = await Contract.find({ landlordId: req.user.id }).sort({ createdAt: -1 });
  res.json({ contracts: list });
});

router.post('/', authenticate, requireRole('landlord', 'admin'), async (req, res) => {
  const { tenantId, propertyId, startDate, endDate, documentUrl } = req.body;
  const landlordId = req.user.role === 'landlord' ? req.user.id : req.body.landlordId;
  const contract = await Contract.create({ tenantId, landlordId, propertyId, startDate, endDate, documentUrl });
  res.status(201).json({ contract });
});

export default router;
