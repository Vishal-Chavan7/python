import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['due', 'paid', 'overdue'], default: 'due' },
    paidAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', PaymentSchema);
