// api/gallery.js — Vercel Serverless Function
// Returns photos from a Cloudinary folder as JSON.
// For the "our-work" folder, photos should be named:
//   jobname-before.jpg  /  jobname-after.jpg
// The gallery page pairs them automatically by matching base filename.
//
// Environment variables (set in Vercel dashboard):
//   CLOUDINARY_CLOUD_NAME
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const folder  = req.query.folder;
  const allowed = ['our-work', 'reviews'];

  if (!folder || !allowed.includes(folder)) {
    return res.status(400).json({ error: 'Invalid folder. Use: our-work or reviews' });
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id', 'asc')   // alphabetical so before/after pairs stay together
      .max_results(100)
      .execute();

    const photos = result.resources.map(r => ({
      url:        r.secure_url,
      public_id:  r.public_id,
      filename:   r.public_id.split('/').pop(),
      width:      r.width,
      height:     r.height,
      created_at: r.created_at,
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(photos);
  } catch (err) {
    console.error('Cloudinary error:', err.message);
    return res.status(500).json({ error: 'Failed to load photos' });
  }
};
