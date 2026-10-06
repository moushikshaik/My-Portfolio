/* ==========================================================================
   AMBIENT INTERACTIVE CANVAS BACKGROUND
   Floating glowing particle constellations with gentle mouse interactivity
   ========================================================================== */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = {
    x: null,
    y: null,
    radius: 140
  };

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around screen
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = (dx / distance) * force * 2;
          let directionY = (dy / distance) * force * 2;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      this.draw();
    }
  }

  let particlesArray = [];

  function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.min(Math.floor((width * height) / 14000), 90);
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 120;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          let opacity = (1 - dist / maxDist) * 0.18;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
  }

  initParticles();
  animate();
})();
