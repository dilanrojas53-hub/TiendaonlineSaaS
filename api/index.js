'use strict';

const fs = require('node:fs');
const path = require('node:path');

const runtimeStore = '/tmp/lua-store.json';
if (!fs.existsSync(runtimeStore)) {
  fs.copyFileSync(path.join(process.cwd(), 'data', 'store.json'), runtimeStore);
}
process.env.STORE_DATA_PATH = runtimeStore;

const { server } = require('../server');
const handleRequest = server.listeners('request')[0];

module.exports = async function handler(req, res) {
  const original = new URL(req.url, 'http://localhost');
  const routedPath = original.searchParams.get('path') || '';
  original.searchParams.delete('path');
  const query = original.searchParams.toString();
  req.url = `/api/${routedPath}${query ? `?${query}` : ''}`;
  return handleRequest(req, res);
};
