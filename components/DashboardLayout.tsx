import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { 
  Search, 
  Phone, 
  Smartphone, 
  Ruler, 
  CreditCard, 
  Clock, 
  MoreVertical, 
  User, 
  MapPin, 
  Circle,
  FileText,
  History
} from 'lucide-react';

// Mock data for sidebar leads
const leads = [
  { id: 1, name: 'Ana Silva', model: 'iPhone 13', status: 'waiting_approval', time: '10:42', msg: 'Gostei do mockup, vou querer!', unread: 1 },
  { id: 2, name: 'Bruno Souza', model: 'S23 Ultra', status: 'lead_received', time: '09:15', msg: 'Qual o prazo de entrega?', unread: 0 },
  { id: 3, name: 'Carla Dias', model: 'iPhone 14 Pro', status: 'preview_sent', time: 'Ontem', msg: 'Aguardando a foto ficar pronta.', unread: 0 },
  { id: 4, name: 'Diego Lima', model: 'Pixel 7', status: 'produced', time: 'Ontem', msg: 'Obrigado pelo atendimento!', unread: 0 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'lead_received': return 'bg-blue-500';
    case 'preview_sent': return 'bg-purple-500';
    case 'waiting_approval': return 'bg-yellow-500';
    case 'approved_for_production': return 'bg-emerald-500';
    default: return 'bg-slate-500';
  }
};

export function DashboardLayout() {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0].id);
  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  return (
    <div className="flex h-full bg-slate-950 text-slate-100 overflow-hidden">
        {/* Left Sidebar - Leads */}
        <aside className="w-80 border-r border-slate-800 flex flex-col bg-slate-950 flex-shrink-0">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-lg font-bold mb-4 tracking-tight">Leads Recentes</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  type="text" 
                  placeholder="Buscar cliente..." 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Leads List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {leads.map(lead => (
                <div 
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-4 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-900 ${selectedLeadId === lead.id ? 'bg-slate-900 border-l-2 border-l-purple-500' : 'border-l-2 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-semibold text-sm ${selectedLeadId === lead.id ? 'text-white' : 'text-slate-300'}`}>{lead.name}</span>
                    <span className="text-[10px] text-slate-500">{lead.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{lead.msg}</p>
                    {lead.unread > 0 && (
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {lead.unread}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`}></span>
                     <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{lead.model}</span>
                  </div>
                </div>
              ))}
            </div>
        </aside>

        {/* Middle - Chat Interface */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-900/30 relative">
             <ChatInterface />
        </main>

        {/* Right Sidebar - Cockpit */}
        <aside className="w-80 border-l border-slate-800 bg-slate-950 flex flex-col flex-shrink-0">
             <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                <span className="font-bold text-sm flex items-center gap-2">
                  <Smartphone size={16} className="text-purple-500" /> Detalhes do Pedido
                </span>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
             </div>

             <div className="p-5 space-y-6 overflow-y-auto">
                {/* Customer Info */}
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">{selectedLead.name}</h3>
                          <p className="text-xs text-emerald-400 flex items-center gap-1">Online agora</p>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 py-1.5 rounded text-xs flex items-center justify-center gap-2 transition-colors">
                        <Phone size={12} /> WhatsApp
                      </button>
                      <button className="flex-1 bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 py-1.5 rounded text-xs flex items-center justify-center gap-2 transition-colors">
                         <History size={12} /> Histórico
                      </button>
                   </div>
                </div>

                <div className="h-px bg-slate-800/80 w-full" />

                {/* Product Specs */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Especificações</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/50">
                       <span className="text-slate-400 flex items-center gap-2"><Smartphone size={14}/> Modelo</span>
                       <span className="font-medium text-purple-300">{selectedLead.model}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/50">
                       <span className="text-slate-400 flex items-center gap-2"><Ruler size={14}/> Altura</span>
                       <span className="font-medium">146.7 mm</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/50">
                       <span className="text-slate-400 flex items-center gap-2"><CreditCard size={14}/> Tipo</span>
                       <span className="font-medium">Impact Case</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/50">
                       <span className="text-slate-400 flex items-center gap-2"><MapPin size={14}/> Estado</span>
                       <span className="font-medium">São Paulo, SP</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/80 w-full" />

                {/* Status Timeline Compact */}
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Status Atual</h4>
                   <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <Clock className="text-purple-500" size={18} />
                      <div>
                        <p className="text-xs text-slate-400">Última atualização</p>
                        <p className="text-sm font-bold text-slate-200">Aguardando Aprovação</p>
                      </div>
                   </div>
                </div>
                
                {/* Actions */}
                <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FileText size={14} /> Ver Fatura / Pedido
                </button>
             </div>
        </aside>
    </div>
  )
}