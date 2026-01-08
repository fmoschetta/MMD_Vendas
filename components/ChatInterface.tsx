import React, { useState } from 'react';
import { Sparkles, CheckCircle, Loader2, Image as ImageIcon, Send } from 'lucide-react';
import { orderSpecs, helenaAI } from '../services/api';

export function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([
    { sender: 'helena', type: 'text', text: 'Olá! Sou a Helena. Me envie a arte que eu gero o mockup em segundos.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setIsProcessing(true);
      // Simulate user sending image
      setMessages(prev => [...prev, { sender: 'user', type: 'text', text: 'Enviando imagem para mockup...' }]);
      
      const url = await helenaAI.generateMockup(file);
      setMessages(prev => [...prev, { sender: 'helena', type: 'mockup', imageUrl: url }]);
      setIsProcessing(false);
    }
  };

  const approveOrder = async () => {
    await orderSpecs.updateStatus('order-123', 'approved_for_production');
    setMessages(prev => [...prev, { sender: 'system', type: 'text', text: '✅ Produção Autorizada pelo Cliente!' }]);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', type: 'text', text: inputValue }]);
    setInputValue('');
  };

  return (
    <section 
      className="flex-1 bg-slate-950 relative flex flex-col h-full overflow-hidden" 
      onDragOver={(e) => {e.preventDefault(); setIsDragging(true)}} 
      onDragLeave={() => setIsDragging(false)} 
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center border-2 border-dashed border-purple-500 m-4 rounded-xl">
          <ImageIcon className="animate-bounce text-purple-500 mb-4" size={48}/>
          <p className="text-purple-300 font-medium">Solte a arte aqui para gerar o mockup</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
           <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.sender === 'user' 
                  ? 'bg-purple-600 text-white rounded-tr-none' 
                  : msg.sender === 'system'
                  ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 w-full text-center'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {msg.type === 'text' && <p>{msg.text}</p>}
                
                {msg.type === 'mockup' && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-400 mb-2 flex items-center gap-2"><Sparkles size={14} className="text-purple-400"/> Mockup Gerado por IA</p>
                    <img src={msg.imageUrl} className="w-full rounded-lg border border-slate-700 shadow-lg" alt="Mockup" />
                    <button 
                      onClick={approveOrder} 
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <CheckCircle size={14}/> APROVAR PARA PRODUÇÃO
                    </button>
                  </div>
                )}
              </div>
           </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
             <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                <Loader2 className="animate-spin text-purple-500" size={18} />
                <span className="text-sm text-slate-400 animate-pulse">Helena está criando o mockup...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Digite uma mensagem ou arraste uma imagem..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
          />
          <button 
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}