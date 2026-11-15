import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: String, required: true, index: true },
  title: { type: String, required: true, trim: true, minlength: 1, maxlength: 80 },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true, trim: true, maxlength: 40 },
  amount: { type: Number, required: true, min: 0.01, max: 999999999 },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  notes: { type: String, trim: true, maxlength: 240, default: '' },
}, { timestamps: true });

transactionSchema.index({ user: 1, date: -1 });
export default mongoose.model('Transaction', transactionSchema);
