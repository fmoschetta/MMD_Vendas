import axios from 'axios';

// URL DO TÚNEL SEGURO (NGROK)
// Se o Ngrok reiniciar e gerar outro link, troque APENAS esta linha.
const API_BASE_URL = 'https://6dc8f1c10753.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  // IMPORTANTE: Não definir Content-Type aqui. 
  // O navegador define automaticamente o 'boundary' correto para FormData.
});

export const helenaAI = {
  /**
   * Envia a imagem e o modelo para o servidor Python.
   * @param file O arquivo de imagem enviado pelo usuário
   * @param modelSku O código do modelo (ex: 'IPHONE_11', 'IPHONE_17_PRO_MAX')
   */
  generateMockup: async (file: File, modelSku: string = 'IPHONE_11'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // AQUI ESTÁ O SEGREDO: Enviamos o SKU para o Python buscar no Book2.csv
    formData.append('model_sku', modelSku); 

    try {
      console.log(`📡 Enviando para: ${API_BASE_URL} | Modelo: ${modelSku}`);
      
      const response = await api.post('/api/helena/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log("✅ Sucesso! Imagem gerada:", response.data);
      // Retorna a URL da imagem já com a capinha
      return response.data.preview_url;
      
    } catch (error) {
      console.error("❌ Erro ao gerar mockup:", error);
      // Se der erro, devolve a imagem original para não travar o chat
      return URL.createObjectURL(file);
    }
  },

  // Verifica se o servidor está vivo
  checkHealth: async () => {
    try { await api.get('/docs'); return true; } catch { return false; }
  }
};

// --- (O resto do arquivo continua igual para manter compatibilidade) ---

export type ProductionStatus = 'lead_received' | 'preview_sent' | 'waiting_approval' | 'approved_for_production' | 'in_production' | 'produced' | 'shipped';

export interface Order {
  order_id: string;
  customer_name: string;
  device_model: string;
  artwork_source_url?: string;
  production_status: ProductionStatus;
}

export const orderSpecs = {
  getAll: async (): Promise<Order[]> => { return []; },
  updateStatus: async (orderId: string, status: ProductionStatus) => { return { status: 'success' }; },
};

export const copyToClipboard = async (url: string) => { await navigator.clipboard.writeText(url); return true; };

export default api;