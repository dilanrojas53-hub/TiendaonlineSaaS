# LÚA Commerce Full‑Stack

Aplicación de comercio electrónico basada en el prototipo LÚA. El frontend conserva su estética original, pero ahora catálogo, pedidos, precios, inventario, cupones, clientes, métricas y configuración se procesan en un backend real.

## Funciones

- Catálogo con búsqueda, categorías, filtros, ordenamiento, variantes y stock.
- Favoritos y carrito persistentes en el dispositivo.
- Cupones validados con precios reales del servidor.
- Checkout que recalcula el total, valida variantes y descuenta inventario de forma atómica.
- Pedidos, clientes y movimientos de inventario vinculados.
- Cancelación de pedidos con devolución automática de stock.
- Panel administrativo: métricas, productos, inventario, pedidos, clientes, promociones, analítica y configuración.
- Sesión administrativa firmada en cookie `HttpOnly`, `SameSite=Strict`.
- Persistencia JSON con escritura temporal y reemplazo atómico.
- Sin dependencias externas: requiere únicamente Node.js 18 o superior.

## Uso

```bash
cp .env.example .env
# Exportá las variables del archivo .env en tu plataforma o terminal.
npm start
```

La tienda queda en `http://localhost:3000`.

El token de desarrollo es `lua-demo-admin`. **Cambialo antes de publicar** mediante `ADMIN_TOKEN`, y configurá un `SESSION_SECRET` largo y aleatorio.

## Validación

```bash
npm run check
npm test
```

Las pruebas cubren catálogo, cupón, checkout, descuento de stock, autenticación administrativa, cancelación con reposición y ajustes de inventario.

## Persistencia

Por defecto se usa `data/store.json`. Para otro volumen o ruta:

```bash
STORE_DATA_PATH=/ruta/persistente/store.json npm start
```

Para producción se recomienda desplegar en Render, Railway, Fly.io o un servidor con volumen persistente. Una plataforma serverless sin disco persistente requeriría sustituir el adaptador de almacenamiento por una base de datos.

## Pagos

El sistema crea y administra pedidos con métodos como SINPE Móvil, transferencia y contra entrega. No realiza cargos bancarios automáticos: una pasarela real exige credenciales comerciales, webhooks y conciliación del proveedor.
