import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be less than 50 characters long']
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['tenant', 'landlord', 'admin'], required: true },
    isVerifiedEmail: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    refreshToken: { type: String, default: null, select: false },
    refreshTokenExpiresAt: { type: Date, default: null },
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
