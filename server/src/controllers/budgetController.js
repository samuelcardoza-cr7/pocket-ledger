import * as budgets from '../services/budgetService.js';
const thisMonth = () => new Date().toISOString().slice(0, 7);
export const current = async (req, res) => res.json(await budgets.getCurrent(req.userId, req.query.month || thisMonth()));
export const update = async (req, res) => res.json(await budgets.setMonthlyLimit(req.userId, req.body.monthlyLimit));
