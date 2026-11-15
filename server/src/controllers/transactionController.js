import * as transactions from '../services/transactionService.js';
export const list = async (req, res) => res.json(await transactions.list(req.userId, req.query));
export const create = async (req, res) => res.status(201).json(await transactions.create(req.userId, req.body));
export const update = async (req, res) => res.json(await transactions.update(req.userId, req.params.id, req.body));
export const remove = async (req, res) => { await transactions.remove(req.userId, req.params.id); res.status(204).end(); };
export const summary = async (req, res) => res.json(await transactions.summary(req.userId, req.query.month));
