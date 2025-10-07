import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['apartment', 'house', 'studio', 'other'], default: 'apartment' },
    location: { type: String, required: true },
    rent: { type: Number, required: true },
    images: [String],
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Property', PropertySchema);
