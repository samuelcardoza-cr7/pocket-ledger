import { useState } from 'react';
import Modal from './Modal.jsx';
export default function BudgetModal({ initial, onClose, onSave }) {
  const [value, setValue] = useState(String(initial));
  return <Modal title="Monthly budget" onClose={onClose}><form className="form" onSubmit={(e) => { e.preventDefault(); onSave(Math.max(0, Number(value) || 0)); onClose(); }}><p className="modal-copy">Set a monthly spending target. We’ll compare it with this month’s expenses.</p><label>Budget amount<input type="number" min="0" step="50" value={value} onChange={(e) => setValue(e.target.value)} autoFocus/></label><button className="primary-btn form-submit">Save budget</button></form></Modal>;
}
