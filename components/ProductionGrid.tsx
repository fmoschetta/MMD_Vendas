import React, { useEffect, useState } from 'react';
import { Copy, Loader2, RefreshCcw } from 'lucide-react';
import { orderSpecs, Order, copyToClipboard } from '../services/api';

export function ProductionGrid() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try { 
      setLoading(true); 
      const data = await orderSpecs.getAll(); 
      setOrders(data); 
    } 
    catch (error) { 
      console.error(error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadOrders();
    // Simulate WebSocket connection for demo
    const interval = setInterval(() => {
        // In real app, this would be: socket.onmessage...
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="h-full flex items-center justify-center bg-slate-950">
      <Loader2 className="animate-spin text-purple-500" size={32} />
    </div>
  );

  return (
    <div className="p-6 h-full flex flex-col bg-slate-950 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-emerald-500 rounded-full block"></span>
          Fila de Produção
        </h2>
        <button onClick={loadOrders} className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <RefreshCcw size={16} />
        </button>
      </div>

       <div className="grid gap-4">
         {/* Table Header */}
         <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
            <div className="col-span-3">Cliente</div>
            <div className="col-span-3">Modelo</div>
            <div className="col-span-2">Altura</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Ações</div>
         </div>

         {/* Rows */}
         {orders.map(order => (
           <div key={order.order_id} className="grid grid-cols-12 gap-4 items-center p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
              <div className="col-span-3 font-medium text-slate-200">{order.customer_name}</div>
              <div className="col-span-3">
                 <span className="px-2 py-1 bg-slate-800 rounded text-xs text-purple-300 font-mono">{order.device_model}</span>
              </div>
              <div className="col-span-2 text-sm text-slate-400">{order.case_height_mm} mm</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                  ${order.production_status === 'approved_for_production' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    order.production_status === 'in_production' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    'bg-slate-800 text-slate-500'}`}>
                  {order.production_status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="col-span-2 flex justify-end">
                <button 
                  disabled={order.production_status !== 'approved_for_production'}
                  onClick={() => {
                    copyToClipboard(order.artwork_source_url || '');
                    // Visual feedback could be added here
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all
                    ${order.production_status === 'approved_for_production' 
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20' 
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
                >
                  <Copy size={12} /> Copiar Arte
                </button>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
}