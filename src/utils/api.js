import tenant from '../config/tenant.json';

export function apiUrl(path) {
  const base = tenant.base_url?.replace(/\/+$/, '') || '';
  const p = String(path || '').replace(/^\/+/, '');
  
  return `${base}/${p}`;
}

export default apiUrl;