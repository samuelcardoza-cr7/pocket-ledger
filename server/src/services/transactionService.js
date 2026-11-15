import Transaction from '../models/Transaction.js';

const allowed = new Set(['title', 'type', 'category', 'amount', 'date', 'notes']);
function clean(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw Object.assign(new Error('Invalid transaction.'), { status: 400 });
  const data = Object.fromEntries(Object.entries(payload).filter(([key]) => allowed.has(key)));
  if (typeof data.title !== 'string' || !data.title.trim() || data.title.length > 80) throw Object.assign(new Error('Add a description of up to 80 characters.'), { status: 400 });
  if (!['income', 'expense'].includes(data.type)) throw Object.assign(new Error('Choose income or expense.'), { status: 400 });
  if (typeof data.category !== 'string' || !data.category.trim() || data.category.length > 40) throw Object.assign(new Error('Choose a valid category.'), { status: 400 });
  if (!Number.isFinite(data.amount) || data.amount <= 0 || data.amount > 999999999) throw Object.assign(new Error('Amount must be a positive number.'), { status: 400 });
  const parsedDate = typeof data.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.date) ? new Date(`${data.date}T00:00:00Z`) : null;
  if (!parsedDate || Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== data.date) throw Object.assign(new Error('Choose a valid date.'), { status: 400 });
  if (data.notes !== undefined && (typeof data.notes !== 'string' || data.notes.length > 240)) throw Object.assign(new Error('Notes must be 240 characters or fewer.'), { status: 400 });
  return { ...data, title: data.title.trim(), category: data.category.trim(), notes: data.notes?.trim() || '' };
}

export async function list(userId, query) {
  const filter = { user: userId };
  if (query.type && ['income', 'expense'].includes(query.type)) filter.type = query.type;
  if (query.category && query.category.length <= 40) filter.category = query.category;
  if (query.from || query.to) filter.date = { ...(query.from ? { $gte: query.from } : {}), ...(query.to ? { $lte: query.to } : {}) };
  return Transaction.find(filter).sort({ date: -1, createdAt: -1 }).limit(1000).lean();
}
export async function create(userId, payload) { return Transaction.create({ ...clean(payload), user: userId }); }
export async function update(userId, id, payload) {
  const record = await Transaction.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: clean(payload) },
    { new: true, runValidators: true },
  ).lean();
  if (!record) throw Object.assign(new Error('Transaction not found.'), { status: 404 });
  return record;
}
export async function remove(userId, id) {
  const record = await Transaction.findOneAndDelete({ _id: id, user: userId });
  if (!record) throw Object.assign(new Error('Transaction not found.'), { status: 404 });
  return record;
}
export async function summary(userId, month) {
  if (!/^\d{4}-\d{2}$/.test(month)) throw Object.assign(new Error('Month must use YYYY-MM format.'), { status: 400 });
  const [result] = await Transaction.aggregate([
    { $match: { user: userId, date: { $gte: `${month}-01`, $lte: `${month}-31` } } },
    { $facet: {
      byType: [{ $group: { _id: '$type', total: { $sum: '$amount' }, count: { $sum: 1 } } }],
      expenseCategories: [{ $match: { type: 'expense' } }, { $group: { _id: '$category', total: { $sum: '$amount' } } }, { $sort: { total: -1 } }],
    } },
  ]);
  const byType = Object.fromEntries((result?.byType || []).map((entry) => [entry._id, { total: entry.total, count: entry.count }]));
  const income = byType.income?.total || 0;
  const expense = byType.expense?.total || 0;
  return { month, income, expense, balance: income - expense, categories: result?.expenseCategories || [] };
}
