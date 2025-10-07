import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import Payment from '../models/Payment.js';

const router = Router();

router.get('/tenant', authenticate, requireRole('tenant'), async (req, res) => {
  const list = await Payment.find({ tenantId: req.user.id }).sort({ createdAt: -1 });
  res.json({ payments: list });
});

router.get('/landlord', authenticate, requireRole('landlord'), async (req, res) => {
  const list = await Payment.find({ landlordId: req.user.id }).sort({ createdAt: -1 });
  res.json({ payments: list });
});

router.post('/pay', authenticate, requireRole('tenant'), async (req, res) => {
  const { paymentId } = req.body;
  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId, tenantId: req.user.id },
    { status: 'paid', paidAt: new Date() },
    { new: true }
  );
  if (!payment) return res.status(404).json({ message: 'Not found' });
  res.json({ payment });
});

router.post('/create', authenticate, requireRole('landlord', 'admin'), async (req, res) => {
  const { tenantId, propertyId, amount } = req.body;
  const landlordId = req.user.role === 'landlord' ? req.user.id : req.body.landlordId;
  const payment = await Payment.create({ tenantId, landlordId, propertyId, amount });
  res.status(201).json({ payment });
});

export default router;
