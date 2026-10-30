/**
 * storage.js (PRD F9 & Bagian 10)
 * Pengelolaan sesi di localStorage dengan penanganan try/catch aman (PRD 14).
 * Kunci: ultah:{slug}
 */

export function saveSession(slug, data) {
  try {
    if (!slug) return;
    localStorage.setItem(`ultah:${slug}`, JSON.stringify(data));
  } catch {
    // Abaikan jika storage penuh atau private browsing memblokir
  }
}

export function loadSession(slug) {
  try {
    if (!slug) return null;
    const raw = localStorage.getItem(`ultah:${slug}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession(slug) {
  try {
    if (!slug) return;
    localStorage.removeItem(`ultah:${slug}`);
  } catch {
    // Abaikan
  }
}
