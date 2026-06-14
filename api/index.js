'use strict';

const SUPABASE_URL = 'https://zddytyncmnivfbvehrth.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZHl0eW5jbW5pdmZidmVocnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTY1NDMsImV4cCI6MjA4NzQ5MjU0M30.aNQBiSsV-RXHze7D6LF4WGBwEdHyov-umuTh0t-Patk';
const EDGE_URL = `${SUPABASE_URL}/functions/v1/lua-commerce-api`;

module.exports = async function handler(req, res) {
  const incoming = new URL(req.url, 'http://localhost');
  const routedPath = incoming.searchParams.get('path') || '';
  incoming.searchParams.delete('path');

  const target = new URL(`${EDGE_URL}/api/${routedPath}`);
  incoming.searchParams.forEach((value, key) => target.searchParams.append(key, value));

  const headers = new Headers({
    apikey: SUPABASE_ANON_KEY,
    authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  });

  for (const name of ['content-type', 'cookie', 'origin', 'user-agent', 'x-forwarded-for']) {
    const value = req.headers[name];
    if (value) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }

  let body;
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    if (Buffer.isBuffer(req.body)) body = req.body;
    else if (typeof req.body === 'string') body = req.body;
    else body = JSON.stringify(req.body ?? {});
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  }

  const response = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: 'manual',
  });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });
  res.end(Buffer.from(await response.arrayBuffer()));
};
