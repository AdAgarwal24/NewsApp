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

  const queryMap = {
    general: '(india OR indian)',
    business: '(india OR indian) AND (business OR economy OR markets OR startup OR finance)',
    entertainment: '(india OR indian) AND (entertainment OR movie OR cinema OR celebrity OR music)',
    health: '(india OR indian) AND (health OR medical OR hospital OR wellness OR healthcare)',
    science: '(india OR indian) AND (science OR research OR space OR climate OR innovation)',
    sports: '(india OR indian) AND (sports OR cricket OR football OR olympics OR athlete)',
    technology: '(india OR indian) AND (technology OR tech OR ai OR startup OR gadgets OR software)'
  };

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const params = new URLSearchParams({
    q: queryMap[category] || queryMap.general,
    searchIn: 'title,description',
    sortBy: 'publishedAt',
    language: 'en',
    from: fromDate.toISOString(),
    page: String(page),
    pageSize: String(pageSize),
    apiKey
  });

  const response = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      status: 'error',
      message: data?.message || 'Unable to load news'
    });
  }

  return res.status(200).json(data);
}
