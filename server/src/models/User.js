import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['tenant', 'landlord', 'admin'], required: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    // tenant fields
    emergencyContacts: [{ name: String, phone: String }],
    savedPropertyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    // landlord fields
    payoutBank: {
      accountHolder: String,
      accountNumber: String,
      routingNumber: String,
      bankName: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
