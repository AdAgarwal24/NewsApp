export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      status: 'error',
      message: 'Missing NEWS_API_KEY environment variable'
    });
  }

  const category = (req.query.category || 'general').toString();
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 5);
  const country = (req.query.country || 'in').toString();

  const params = new URLSearchParams({
    country,
    category,
    page: String(page),
    pageSize: String(pageSize),
    apiKey
  });

  const response = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      status: 'error',
      message: data?.message || 'Unable to load news'
    });
  }

  return res.status(200).json(data);
}
