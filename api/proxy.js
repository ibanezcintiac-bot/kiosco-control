export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { table, method = 'GET', data, query } = req.body || {};
    
    if (!table) {
      return res.status(400).json({ error: 'table es requerido' });
    }

    let url = `https://hd1xdajrbxmulzdgudu.supabase.co/rest/v1/${table}`;
    if (query) url += `?${query}`;

    const response = await fetch(url, {
      method: method,
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkaXhkYWpyYnhtdWx6ZGd1ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2OTAzOTAsImV4cCI6MjA5ODI2NjM5MH0.GA5aGebX2fX_evHINng8TCzwlpdwMB1YqvX3tEefjU4',
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    });

    const jsonData = await response.json();
    return res.status(response.status).json(jsonData);
  } catch (error) {
    console.error('Error en proxy:', error);
    return res.status(500).json({ error: error.message || 'Error en servidor' });
  }
}
