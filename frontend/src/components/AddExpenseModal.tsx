'use client';

import { useState, useEffect } from 'react';
import { expensesApi, type Expense } from '@/lib/api';

const CATEGORIES = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Custom'];

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  edit?: Expense | null;
}

export function AddExpenseModal({ open, onClose, onSaved, edit }: AddExpenseModalProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (edit) {
      setAmount(edit.amount);
      setCategory(edit.category);
      setDescription(edit.description ?? '');
      setDate(edit.date.slice(0, 10));
    } else {
      setAmount('');
      setCategory('Food');
      setDescription('');
      setDate(new Date().toISOString().slice(0, 10));
    }
    setError('');
  }, [edit, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      if (edit) {
        await expensesApi.update(edit.id, { amount: num, category, description: description || undefined, date });
      } else {
        await expensesApi.create({ amount: num, category, description: description || undefined, date });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction save failed');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Editorial backdrop - solid but semitransparent */}
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={onClose} />
      
      {/* Rigid sharp card */}
      <div className="relative w-full max-w-lg bg-white border border-borderLight shadow-warm p-8 sm:p-12 animate-fade-in-up font-sans rounded-[2px]">
        <h2 className="text-[32px] font-serif leading-tight tracking-tight text-ink mb-2">
          {edit ? 'Edit Record' : 'New Add'}
        </h2>
        <p className="text-[14px] text-ink/60 mb-8">Maintain the precision of your financial ledger.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-[2px] text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
                Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] px-4 text-[15px] text-ink font-serif placeholder:font-sans placeholder:italic placeholder:text-[#B0A898] outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
              />
            </div>
            <div className="group relative">
              <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] px-4 text-[14px] font-medium text-ink outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04] appearance-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="group relative">
            <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] px-4 text-[14px] text-ink font-sans outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
            />
          </div>

          <div className="group relative">
            <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
              Narrative (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context for this deduction..."
              className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] px-4 text-[15px] text-ink placeholder:text-[#B0A898] placeholder:italic outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-borderLight mt-8 pb-1">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 h-[48px] text-[13px] uppercase tracking-wide font-bold text-ink/60 transition-colors hover:text-ink hover:bg-page rounded-[2px]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 h-[48px] bg-accent text-white rounded-[2px] text-[14px] font-medium tracking-wide transition-colors duration-150 hover:bg-[#133225] disabled:opacity-70"
            >
              {loading ? 'Saving...' : edit ? 'Update Record' : 'Commit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
