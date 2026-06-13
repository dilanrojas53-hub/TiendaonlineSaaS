'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lua-commerce-'));
const tempStore = path.join(tempDir, 'store.json');
fs.copyFileSync(path.join(__dirname, '..', 'data', 'store.json'), tempStore);
process.env.STORE_DATA_PATH = tempStore;
process.env.ADMIN_TOKEN = 'test-admin-token';
process.env.SESSION_SECRET = 'test-session-secret-with-enough-entropy';
const { server } = require('../server');
let base;
let cookie;

test.before(async () => { await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve)); base = `http://127.0.0.1:${server.address().port}`; });
test.after(async () => { await new Promise((resolve) => server.close(resolve)); await fsp.rm(tempDir, { recursive: true, force: true }); });
async function request(url, options = {}) { const response = await fetch(base + url, { ...options, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}), ...(options.headers || {}) } }); const body = await response.json(); return { response, body }; }

test('public store exposes active catalog', async () => { const { response, body } = await request('/api/store'); assert.equal(response.status, 200); assert.ok(body.products.length >= 10); assert.ok(body.categories.includes('Zapatos')); });
test('coupon validation uses server prices', async () => { const { response, body } = await request('/api/coupons/validate', { method: 'POST', body: JSON.stringify({ code: 'BIENVENIDA10', items: [{ productId: '1', size: '38', color: 'hueso', quantity: 1 }] }) }); assert.equal(response.status, 200); assert.equal(body.discount, 3647); });
test('checkout creates order and decreases stock', async () => { const before = (await request('/api/store')).body.products.find((product) => product.id === '1').stock; const { response, body } = await request('/api/orders', { method: 'POST', body: JSON.stringify({ customerName: 'Prueba Automática', email: 'test@example.com', phone: '8888-0000', address: 'San José', paymentMethod: 'SINPE Móvil', couponCode: 'BIENVENIDA10', items: [{ productId: '1', size: '38', color: 'hueso', quantity: 2 }] }) }); assert.equal(response.status, 201); assert.equal(body.items[0].unitPrice, 36465); assert.equal(body.total, 65637); const after = (await request('/api/store')).body.products.find((product) => product.id === '1').stock; assert.equal(after, before - 2); });
test('admin login creates session and protected dashboard works', async () => { const login = await fetch(base + '/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: 'test-admin-token' }) }); assert.equal(login.status, 200); cookie = login.headers.get('set-cookie').split(';')[0]; const { response, body } = await request('/api/admin/dashboard'); assert.equal(response.status, 200); assert.ok(body.metrics.orders >= 3); });
test('cancelling an order restores stock', async () => { const orders = (await request('/api/admin/orders')).body; const order = orders.find((item) => item.email === 'test@example.com'); const before = (await request('/api/store')).body.products.find((product) => product.id === '1').stock; const changed = await request(`/api/admin/orders/${encodeURIComponent(order.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'Cancelado' }) }); assert.equal(changed.response.status, 200); const after = (await request('/api/store')).body.products.find((product) => product.id === '1').stock; assert.equal(after, before + 2); });
test('admin can create and adjust a product', async () => { const created = await request('/api/admin/products', { method: 'POST', body: JSON.stringify({ nombre: 'Producto Test', marca: 'LÚA', categoria: 'Accesorios', precio: 10000, stock: 3, tallas: ['Única'], colores: [{ n: 'negro', h: '#111111' }], imgs: ['/api/placeholder?label=Test'] }) }); assert.equal(created.response.status, 201); const adjusted = await request('/api/admin/inventory', { method: 'POST', body: JSON.stringify({ productId: created.body.id, quantity: 2, note: 'Prueba' }) }); assert.equal(adjusted.response.status, 200); assert.equal(adjusted.body.stock, 5); });
