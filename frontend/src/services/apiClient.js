const API_BASE = process.env.API_BASE || 'http://localhost:8080/delapena/v1';

export async function getPets(query) {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${API_BASE}/pets?${params}`);
  return res.json();
}
