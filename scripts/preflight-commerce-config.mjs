const parseHttpUrl = (name, value, errors, allowLoopback) => {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    errors.push(`${name} debe ser una URL absoluta`);
    return null;
  }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    errors.push(`${name} debe ser HTTP(S) y no incluir credenciales`);
  }
  const loopback = ['127.0.0.1', 'localhost', '::1'].includes(parsed.hostname);
  if (parsed.protocol !== 'https:' && !(allowLoopback && loopback)) {
    errors.push(`${name} debe usar HTTPS`);
  }
  return parsed;
};

export const validateCommerceConfig = (env) => {
  if (env.NODE_ENV !== 'production') return [];
  const errors = [];
  const allowLoopback = env.COMMERCE_PREFLIGHT_ALLOW_LOOPBACK === '1';
  const siteValue = (env.NEXT_PUBLIC_BASE_URL || '').trim();
  const apiValue = (env.NEXT_PUBLIC_STORE_API_URL || '').trim();
  const site = siteValue
    ? parseHttpUrl('NEXT_PUBLIC_BASE_URL', siteValue, errors, allowLoopback)
    : (errors.push('NEXT_PUBLIC_BASE_URL es obligatoria'), null);

  if (!apiValue) {
    if (env.STORE_SAME_ORIGIN_PROXY_CONFIRMED !== 'true') {
      errors.push('Definir NEXT_PUBLIC_STORE_API_URL o confirmar STORE_SAME_ORIGIN_PROXY_CONFIRMED=true');
    }
  } else {
    const api = parseHttpUrl('NEXT_PUBLIC_STORE_API_URL', apiValue, errors, allowLoopback);
    if (site && api && site.hostname !== api.hostname) {
      errors.push('NEXT_PUBLIC_STORE_API_URL debe conservar el host público de la tienda');
    }
  }

  const images = (env.NEXT_PUBLIC_STORE_IMAGES_URL || '').trim();
  if (images) parseHttpUrl('NEXT_PUBLIC_STORE_IMAGES_URL', images, errors, allowLoopback);
  return errors;
};

const invoked = process.argv[1]?.replace(/\\/g, '/');
if (invoked && import.meta.url.endsWith(invoked.startsWith('/') ? invoked : `/${invoked}`)) {
  const errors = validateCommerceConfig(process.env);
  for (const error of errors) console.error(`FAIL ${error}`);
  if (errors.length) process.exit(1);
  console.log('OK configuración de tienda');
}
