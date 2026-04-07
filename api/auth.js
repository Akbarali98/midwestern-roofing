// api/auth.js — Vercel Serverless Function
// Validates the upload page password
// Environment variable required (set in Vercel dashboard):
//   UPLOAD_PASSWORD  (any password you choose for the client)

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { p } = req.query;
  const password = process.env.UPLOAD_PASSWORD;

  if (!password) {
    return res.status(500).json({ ok: false, error: 'Password not configured' });
  }

  if (p === password) {
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: false });
};
