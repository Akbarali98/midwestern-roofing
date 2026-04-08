// api/gallery.js — Vercel Serverless Function
// Fetches projects from Sanity CMS via GROQ query.
//
// Environment variable (set in Vercel dashboard):
//   SANITY_API_TOKEN  — Viewer token from sanity.io/manage

const PROJECT_ID  = 'ot1ams1m';
const DATASET     = 'production';
const API_VERSION = '2021-10-21';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const query = `*[_type == "project"] | order(displayOrder asc, _createdAt asc) {
    _id,
    title,
    location,
    category,
    "beforeUrl": beforePhoto.asset->url,
    "afterUrl": afterPhoto.asset->url
  }`;

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(data.result || []);
  } catch (err) {
    console.error('Sanity error:', err.message);
    return res.status(500).json({ error: 'Failed to load projects' });
  }
};
