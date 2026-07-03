export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { table, method = 'GET', data, query } = req.body;

  const SUPABASE_URL = 'https://hd1xdajrbxmulzdgudu.supabase.co/rest/v1';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkaXhkYWpyYnhtdWx6ZGd1ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2OTAzOTAsImV4cCI6MjA5ODI2NjM5MH0.GA5aGebX2fX_evHINng8TCzwlpdwMB1YqvX3tEefjU4';

  try {
    let url = `${SUPABASE_URL}/${table}`;
    if (query) url += `?${query}`;

    const options = {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    };

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    res.status(response.status).json(result);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
