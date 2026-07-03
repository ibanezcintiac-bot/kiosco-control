import fetch from 'node-fetch';

const SUPABASE_URL = 'https://hd1xdajrbxmulzdgudu.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkaXhkYWpyYnhtdWx6ZGd1ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2OTAzOTAsImV4cCI6MjA5ODI2NjM5MH0.GA5aGebX2fX_evHINng8TCzwlpdwMB1YqvX3tEefjU4';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { table, method, data, query } = req.body;

  try {
    let url = `${SUPABASE_URL}/${table}`;
    if (query) url += `?${query}`;

    const options = {
      method: method || 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
