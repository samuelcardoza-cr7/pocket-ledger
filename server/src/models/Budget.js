import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  monthlyLimit: { type: Number, required: true, min: 0, max: 999999999, default: 24000 },
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
