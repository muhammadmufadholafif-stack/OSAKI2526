/**
 * api.js (PRD Bagian 10 & 12)
 * Pembungkus fetch untuk memanggil Vercel Serverless Functions dengan penanganan error.
 */

export async function verifyPinApi(slug, pin) {
  const res = await fetch('/api/pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, pin })
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function advanceChatApi(token) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ action: 'advance' })
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function sendChatApi(token) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ action: 'send' })
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function getContentApi(token) {
  const res = await fetch('/api/content', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function getHadiahApi(token) {
  const res = await fetch('/api/hadiah', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function claimHadiahApi(token, payload) {
  const res = await fetch('/api/klaim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}
