/**
 * http.js (PRD Bagian 10 & 12)
 * Helper respons HTTP, pengurai JSON body aman, dan method guard untuk Vercel Serverless Functions.
 */

function json(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.status(statusCode).json(data);
}

function error(res, statusCode, code, message) {
  json(res, statusCode, { error: code, message });
}

function methodGuard(req, res, allowedMethods = ['GET']) {
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    error(res, 405, 'METHOD_NOT_ALLOWED', `Method ${req.method} tidak diizinkan`);
    return false;
  }
  return true;
}

function parseBearerToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || typeof authHeader !== 'string') return null;
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1];
  }
  return null;
}

module.exports = {
  json,
  error,
  methodGuard,
  parseBearerToken
};
