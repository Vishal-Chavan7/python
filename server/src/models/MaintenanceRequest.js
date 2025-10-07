import mongoose from 'mongoose';

const MaintenanceRequestSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
