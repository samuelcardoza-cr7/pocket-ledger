import { useState } from 'react';
import { categories } from '../data/demo.js';
import Modal from './Modal.jsx';

export default function TransactionModal({ initial = null, onClose, onSave }) {
  const [type, setType] = useState(initial?.type || 'expense');
  const [category, setCategory] = useState(initial?.category || categories[initial?.type || 'expense'][0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const categoryOptions = categories[type].includes(category) ? categories[type] : [category, ...categories[type]];

  function changeType(nextType) {
    setType(nextType);
    setCategory((current) => categories[nextType].includes(current) ? current : categories[nextType][0]);
  }

  async function submit(e) {
    e.preventDefault(); setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.title.trim() || !Number.isFinite(Number(data.amount)) || Number(data.amount) <= 0 || !data.date) { setError('Add a description, a positive amount, and a date.'); return; }
    setBusy(true);
    try { await onSave({ ...data, type, amount: Number(data.amount) }); onClose(); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <Modal title={initial ? 'Edit transaction' : 'Add transaction'} onClose={onClose}><form className="form" onSubmit={submit}>
    <div className="segmented"><button type="button" className={type === 'expense' ? 'active expense' : ''} onClick={() => changeType('expense')}>Expense</button><button type="button" className={type === 'income' ? 'active income' : ''} onClick={() => changeType('income')}>Income</button></div>
    <label>Description<input name="title" defaultValue={initial?.title || ''} placeholder="e.g. Weekly groceries" maxLength="80" required autoFocus/></label>
    <div className="form-row"><label>Amount<input name="amount" type="number" min="0.01" step="0.01" defaultValue={initial?.amount ?? ''} placeholder="0.00" required/></label><label>Category<select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>{categoryOptions.map((c) => <option key={c}>{c}</option>)}</select></label></div>
    <div className="form-row"><label>Date<input name="date" type="date" defaultValue={initial?.date || new Date().toISOString().slice(0, 10)} required/></label><label>Note <span className="optional">optional</span><input name="notes" defaultValue={initial?.notes || ''} placeholder="Add a note" maxLength="240"/></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-btn form-submit" disabled={busy}>{busy ? (initial ? 'Updating…' : 'Saving…') : (initial ? 'Save changes' : 'Save transaction')}</button>
  </form></Modal>;
}
