import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export async function getCurrent(userId, month) {
  if (!/^\d{4}-\d{2}$/.test(month)) throw Object.assign(new Error('Month must use YYYY-MM format.'), { status: 400 });
  const budget = await Budget.findOne({ user: userId }).lean();
  const monthlyLimit = budget?.monthlyLimit ?? 2400;
  const [aggregate] = await Transaction.aggregate([
    { $match: { user: userId, type: 'expense', date: { $gte: `${month}-01`, $lte: `${month}-31` } } },
    { $group: { _id: null, spent: { $sum: '$amount' } } },
  ]);
  return { monthlyLimit, spent: aggregate?.spent || 0, month };
}
export async function setMonthlyLimit(userId, value) {
  if (!Number.isFinite(value) || value < 0 || value > 999999999) throw Object.assign(new Error('Enter a valid, non-negative monthly budget.'), { status: 400 });
  return Budget.findOneAndUpdate({ user: userId }, { monthlyLimit: value }, { upsert: true, new: true, runValidators: true }).lean();
}
