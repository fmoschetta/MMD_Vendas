import React, { useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { ProductionGrid } from './components/ProductionGrid';
import { LayoutDashboard, Factory } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'sales' | 'production'>('sales');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 flex flex-col">
      <header className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-bold tracking-tight text-sm">MegaFlow <span className="text-slate-500">v1.0</span></span>
        </div>
        <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => setViewMode('sales')} 
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-all ${viewMode === 'sales' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutDashboard size={14} /> CRM Vendas
          </button>
          <button 
            onClick={() => setViewMode('production')} 
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-all ${viewMode === 'production' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Factory size={14} /> Chão de Fábrica
          </button>
        </div>
      </header>
      <main className="pt-12 flex-1 h-screen overflow-hidden">
        {viewMode === 'sales' ? <DashboardLayout /> : <ProductionGrid />}
      </main>
    </div>
  );
}