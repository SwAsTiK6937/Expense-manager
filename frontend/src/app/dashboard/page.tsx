'use client';

import { useState, useEffect, useCallback } from 'react';
import { expensesApi, type Expense } from '@/lib/api';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { BudgetCard } from '@/components/BudgetCard';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const fetchExpenses = useCallback(() => {
    expensesApi.list({ limit: 50 }).then((r) => setExpenses(r.expenses)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await expensesApi.delete(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-accent selection:text-white font-sans pb-32">
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 pt-16 relative z-10 w-full animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="uppercase tracking-[0.2em] text-[11px] font-bold text-ink/70 mb-3">
              Overview
            </div>
            <h1 className="text-[48px] font-serif leading-[1.05] tracking-tight text-ink">
              Dashboard
            </h1>
          </div>
          <button 
            type="button" 
            onClick={() => { setEditing(null); setModalOpen(true); }} 
            className="bg-accent text-white px-6 py-3 rounded-[2px] text-[14px] font-semibold tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Add record
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
             <BudgetCard />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-borderLight shadow-warm rounded-[2px] overflow-hidden">
              <div className="px-8 py-6 border-b border-borderLight flex items-center justify-between bg-white pt-8">
                <h2 className="text-[18px] font-serif font-medium tracking-tight text-ink">Recent transactions</h2>
              </div>
              
              {loading ? (
                <div className="p-12 text-center text-[14px] text-ink/50 italic font-serif">Loading ledger...</div>
              ) : expenses.length === 0 ? (
                <div className="p-12 text-center text-[14px] text-ink/50 italic font-serif">
                  No records found for this period.
                </div>
              ) : (
                <ul className="divide-y divide-borderLight">
                  {expenses.map((e) => (
                    <li key={e.id} className="flex items-center justify-between gap-6 px-8 py-6 hover:bg-[#FAF8F3] transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-widest font-bold text-ink/50 mb-1.5">{e.category}</span>
                        {e.description ? (
                          <span className="text-[15px] font-medium text-ink mb-1">{e.description}</span>
                        ) : (
                          <span className="text-[15px] font-medium text-ink/50 italic mb-1">Unspecified</span>
                        )}
                        <span className="text-[12px] text-ink/50">{e.date}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-serif text-[24px] tracking-tighter text-ink leading-none">
                          ₹{Number(e.amount).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => { setEditing(e); setModalOpen(true); }}
                            className="text-[11px] uppercase tracking-wider font-bold text-ink/50 hover:text-accent transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(e.id)}
                            className="text-[11px] uppercase tracking-wider font-bold text-ink/50 hover:text-[#B5451B] transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddExpenseModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSaved={fetchExpenses}
        edit={editing}
      />
    </div>
  );
}
