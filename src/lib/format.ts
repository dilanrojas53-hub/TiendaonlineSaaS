export const crc = (amount: number) =>
  new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(amount);

export const makeMessage = (productName: string) =>
  encodeURIComponent(`Hola, quiero consultar por este producto: ${productName}. Tienen mi talla disponible?`);
