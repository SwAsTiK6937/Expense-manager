'use client';

import { useState, useEffect } from 'react';
import { budgetsApi, type BudgetSummary } from '@/lib/api';

export function BudgetCard() {
  const [data, setData] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  useEffect(() => {
    budgetsApi.get().then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, []);

  async function saveBudget() {
    const num = parseFloat(inputAmount);
    if (isNaN(num) || num < 0) return;
    setSaving(true);
    try {
      const updated = await budgetsApi.set({ amount: num });
      setData({
        ...data!,
        budget: num,
        spent: data?.spent ?? 0,
        remaining: num - (data?.spent ?? 0),
        percentageUsed: data?.spent ? Math.min(100, (data.spent / num) * 100) : 0,
        month: updated.month,
        year: updated.year,
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8 animate-pulse">
        <div className="h-4 w-32 bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px]" />
        <div className="mt-6 h-12 w-48 bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px]" />
      </div>
    );
  }

  const pct = data?.budget ? Math.min(100, (data.spent / data.budget) * 100) : 0;
  const isOver = data?.budget ? data.spent > data.budget : false;

  return (
    <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
      <div className="flex items-center justify-between border-b border-borderLight pb-4 mb-6">
        <h3 className="text-[12px] font-bold tracking-widest uppercase text-ink/50">
          Budget limit · {monthName}
        </h3>
        {!editing ? (
          <button 
            type="button" 
            onClick={() => { setEditing(true); setInputAmount(String(data?.budget ?? 0)); }} 
            className="text-[11px] font-bold tracking-widest uppercase text-ink/50 hover:text-accent transition-colors"
          >
            Edit
          </button>
        ) : (
          <button 
            type="button" 
            onClick={saveBudget} 
            disabled={saving} 
            className="text-[11px] font-bold tracking-widest uppercase text-accent hover:text-ink transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {editing ? (
        <div className="flex flex-col gap-2 relative group mt-4">
          <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-1 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
            Monthly Limit (₹)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] px-4 text-[15px] text-ink font-serif placeholder:font-sans outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
      ) : (
        <>
          <div className="flex items-end justify-between mb-8">
            <span className="text-[44px] font-serif leading-none tracking-tight text-ink">
              ₹{(data?.remaining ?? 0).toFixed(2)}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">
              Remaining
            </span>
          </div>

          <div className="flex justify-between text-[13px] font-medium text-ink/80 mb-3">
            <span>Spent: ₹{(data?.spent ?? 0).toFixed(2)}</span>
            <span>Limit: ₹{(data?.budget ?? 0).toFixed(2)}</span>
          </div>

          <div className="w-full h-[3px] rounded-none bg-page overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${isOver ? 'bg-[#B5451B]' : 'bg-accent'}`}
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>

          <p className="mt-3 text-[12px] text-ink/50 text-right">
            {pct.toFixed(0)}% Utilized
          </p>
        </>
      )}
    </div>
  );
}
