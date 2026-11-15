const date = (day) => `2026-11-${String(day).padStart(2, '0')}`;
export const demoTransactions = [
  { _id: 'd1', title: 'November salary', category: 'Salary', type: 'income', amount: 48500, date: date(1), notes: 'Monthly pay' },
  { _id: 'd2', title: 'Apartment rent', category: 'Housing', type: 'expense', amount: 14500, date: date(2), notes: 'November rent' },
  { _id: 'd3', title: 'Weekly groceries', category: 'Food & dining', type: 'expense', amount: 864.2, date: date(4), notes: 'Market run' },
  { _id: 'd4', title: 'Freelance design', category: 'Side income', type: 'income', amount: 6200, date: date(5), notes: '' },
  { _id: 'd5', title: 'Electricity bill', category: 'Utilities', type: 'expense', amount: 741.8, date: date(7), notes: 'Autopay' },
  { _id: 'd6', title: 'Train pass', category: 'Transport', type: 'expense', amount: 1120, date: date(9), notes: 'Monthly pass' },
  { _id: 'd7', title: 'Dinner with Maya', category: 'Food & dining', type: 'expense', amount: 485, date: date(10), notes: '' },
  { _id: 'd8', title: 'Streaming subscription', category: 'Lifestyle', type: 'expense', amount: 159.9, date: date(11), notes: 'Monthly' },
  { _id: 'd9', title: 'Pharmacy', category: 'Health', type: 'expense', amount: 327.5, date: date(12), notes: '' },
  { _id: 'd10', title: 'Coffee & pastry', category: 'Food & dining', type: 'expense', amount: 126, date: date(13), notes: '' },
  { _id: 'd11', title: 'Bookshop', category: 'Lifestyle', type: 'expense', amount: 299, date: date(14), notes: '' },
  { _id: 'd12', title: 'Savings interest', category: 'Side income', type: 'income', amount: 182.5, date: date(15), notes: '' },
  { _id: 'd13', title: 'Weekend brunch', category: 'Food & dining', type: 'expense', amount: 368, date: date(16), notes: '' },
];

export const categories = {
  expense: ['Housing', 'Food & dining', 'Transport', 'Utilities', 'Health', 'Lifestyle', 'Education', 'Other'],
  income: ['Salary', 'Side income', 'Investments', 'Gifts', 'Other'],
};
