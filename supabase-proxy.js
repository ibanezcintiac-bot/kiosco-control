// supabase-proxy.js
// Reemplaza llamadas directas a Supabase con llamadas al proxy en Vercel

const API_PROXY = '/api/proxy';

async function supabaseRequest(table, method = 'GET', data = null, query = null) {
  try {
    const response = await fetch(API_PROXY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        table,
        method,
        data,
        query
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Exportar para usar en otros archivos
window.supabaseProxy = supabaseRequest;
