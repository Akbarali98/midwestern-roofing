// api/gallery.js — Vercel Serverless Function
// Fetches photos from Cloudinary folder and returns them as JSON
// Environment variables required (set in Vercel dashboard):
//   CLOUDINARY_CLOUD_NAME
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  // Allow CORS from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const folder = req.query.folder;
  const allowed = ['our-work', 'reviews'];

  if (!folder || !allowed.includes(folder)) {
    return res.status(400).json({ error: 'Invalid folder. Use: our-work or reviews' });
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    const photos = result.resources.map(r => ({
      url: r.secure_url,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
    }));

    // Cache response for 60 seconds on CDN edge
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(photos);
  } catch (err) {
    console.error('Cloudinary error:', err.message);
    return res.status(500).json({ error: 'Failed to load photos' });
  }
};
