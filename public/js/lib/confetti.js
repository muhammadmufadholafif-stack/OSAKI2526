/**
 * confetti.js — Efek Hujan Konfeti Murni (Tanpa Library Luar)
 * Menggunakan HTML5 Canvas dan requestAnimationFrame untuk animasi selebrasi yang halus.
 */

export function fireConfetti(options = {}) {
  const duration = options.duration || 3500;
  const particleCount = options.particleCount || 90;
  const colors = options.colors || [
    '#FF9F0A', '#34C759', '#FF3B30', '#5856D6',
    '#007AFF', '#FFD60A', '#30B0C7', '#FF2D55', '#E056FD'
  ];

  // Buat canvas overlay di atas kontainer/layar
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Generate partikel konfeti
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * (0.2 + 0.6 * Math.random()),
      y: -20 - Math.random() * 50,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: 2 + Math.random() * 5,
      angle: Math.random() * 360,
      vAngle: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.3 ? 'rect' : 'circle',
      opacity: 1
    });
  }

  const startTime = Date.now();
  let animId = null;

  function render() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    ctx.clearRect(0, 0, width, height);

    if (progress >= 1) {
      cancelAnimationFrame(animId);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    // Fade out di 25% durasi terakhir
    const globalAlpha = progress > 0.75 ? (1 - progress) / 0.25 : 1;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // Gravitasi
      p.vx *= 0.99; // Air resistance
      p.angle += p.vAngle;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.globalAlpha = p.opacity * globalAlpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);
}
