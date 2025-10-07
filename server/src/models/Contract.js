import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    documentUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Contract', ContractSchema);
