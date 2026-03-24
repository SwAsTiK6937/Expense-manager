'use client';

import { useState, useEffect } from 'react';
import { analyticsApi, type AnalyticsDashboard } from '@/lib/api';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

const CHART_COLORS = ['#1B4332', '#B5451B', '#2D3A8C', '#8A8278', '#D8D3CB', '#1A1612'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const [from, setFrom] = useState(firstDay.toISOString().slice(0, 10));
  const [to, setTo] = useState(now.toISOString().slice(0, 10));

  useEffect(() => {
    if (!from || !to) return;
    setLoading(true);
    analyticsApi.dashboard({ from, to })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [from, to]);

  const pieData = data?.byCategory.map((c, i) => ({
    name: c.category,
    value: c.total,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  })) || [];

  const lineData = data?.spendingOverTime.map((d) => ({
    date: d.date.slice(5),
    total: data.totalSpent ? Math.round(d.total * 100) / 100 : 0,
  })) || [];

  const barData = data?.monthlyComparison.map((m) => ({
    name: m.label,
    total: m.total,
  })) || [];

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-accent selection:text-white font-sans pb-32">
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 pt-16 relative z-10 w-full flex flex-col items-center">
        
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 animate-fade-in-up">
          <div>
            <div className="uppercase tracking-[0.2em] text-[11px] font-bold text-ink/70 mb-3">
              Performance
            </div>
            <h1 className="text-[48px] font-serif leading-[1.05] tracking-tight text-ink">
              Analytics
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="h-[40px] px-3 bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] text-[13px] font-medium text-ink outline-none transition-all duration-200 focus:border-accent"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <span className="text-[12px] font-medium text-ink/40 uppercase tracking-widest">to</span>
            <input
              type="date"
              className="h-[40px] px-3 bg-[#FAF8F3] border border-[#D8D3CB] rounded-[2px] text-[13px] font-medium text-ink outline-none transition-all duration-200 focus:border-accent"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        {loading && !data ? (
          <div className="w-full h-[40vh] flex items-center justify-center text-[14px] text-ink/50 italic font-serif animate-pulse">
            Calculating datasets...
          </div>
        ) : !data ? (
          <div className="w-full bg-white border border-borderLight shadow-warm rounded-[2px] p-12 text-center">
            <p className="text-[14px] text-ink/60 font-medium">Failed to load analytics structure. Try adjusting the date range.</p>
          </div>
        ) : (
          <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Cumulative Period Spend', value: `₹${data.totalSpent.toFixed(2)}` },
                { label: 'Average Daily Velocity', value: `₹${data.averageDailySpend.toFixed(2)}` },
                { label: 'Highest Output Category', value: data.highestCategory },
                { label: 'Highest Output Volume', value: `₹${data.highestCategoryAmount.toFixed(2)}` },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-borderLight shadow-warm rounded-[2px] p-6">
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-3 mb-4">
                    {stat.label}
                  </h3>
                  <div className="text-[32px] font-serif leading-none tracking-tight text-ink">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Pie Chart */}
              <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
                <h3 className="text-[12px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-4 mb-8">
                  Distribution Breakdown
                </h3>
                {pieData.length === 0 ? (
                  <p className="text-[13px] text-ink/50 italic py-12 text-center">No allocations detected in scope.</p>
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={95}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ stroke: '#D8D3CB', strokeWidth: 1 }}
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} stroke={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(v: number) => `₹${v.toFixed(2)}`} 
                          contentStyle={{ backgroundColor: '#FAF8F3', border: '1px solid #D8D3CB', borderRadius: '2px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          itemStyle={{ color: '#1A1612', fontWeight: 500 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Line Chart */}
              <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
                <h3 className="text-[12px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-4 mb-8">
                  Temporal Velocity
                </h3>
                {lineData.length === 0 ? (
                  <p className="text-[13px] text-ink/50 italic py-12 text-center">No allocations detected in scope.</p>
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DED8" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8A8278' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 11, fill: '#8A8278' }} tickFormatter={(v) => `₹${v}`} axisLine={false} tickLine={false} dx={-10} />
                        <Tooltip 
                          formatter={(v: number) => [`₹${v.toFixed(2)}`, 'Volume']} 
                          contentStyle={{ backgroundColor: '#FAF8F3', border: '1px solid #D8D3CB', borderRadius: '2px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          itemStyle={{ color: '#1A1612', fontWeight: 500 }}
                        />
                        <Line type="monotone" dataKey="total" stroke="#1B4332" strokeWidth={2} dot={{ fill: '#1B4332', r: 3, strokeWidth: 2, stroke: '#FAF8F3' }} activeDot={{ r: 5 }} name="Spent" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
              <h3 className="text-[12px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-4 mb-8">
                Macro Comparison
              </h3>
              {barData.length === 0 ? (
                <p className="text-[13px] text-ink/50 italic py-12 text-center">No structural data available.</p>
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DED8" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8A8278' }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 11, fill: '#8A8278' }} tickFormatter={(v) => `₹${v}`} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip 
                        formatter={(v: number) => [`₹${v.toFixed(2)}`, 'Gross']} 
                        contentStyle={{ backgroundColor: '#FAF8F3', border: '1px solid #D8D3CB', borderRadius: '2px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                        itemStyle={{ color: '#1A1612', fontWeight: 500 }}
                        cursor={{ fill: '#F5F0E8' }}
                      />
                      <Bar dataKey="total" fill="#1B4332" radius={[2, 2, 0, 0]} name="Total" maxBarSize={60} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
