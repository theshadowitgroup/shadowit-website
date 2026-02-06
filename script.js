// ===== Particle Background =====
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECT_DISTANCE = 140;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  canvas.parentElement.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Mouse interaction — gently push particles away
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += dx * 0.0005;
          p.vy += dy * 0.0005;
        }
      }

      // Dampen speed
      p.vx *= 0.999;
      p.vy *= 0.999;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(108, 99, 255, ' + p.opacity + ')';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          const opacity = 0.08 * (1 - dist / CONNECT_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + opacity + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();

// ===== Navbar Scroll Effect =====
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ===== Mobile Menu Toggle =====
(function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.querySelector('.nav-links');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
})();

// ===== Scroll Reveal (Intersection Observer) =====
(function initReveal() {
  var elements = document.querySelectorAll('.fade-up');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Stagger animations slightly
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, 100 * Array.from(elements).indexOf(entry.target) % 400);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

// ===== Contact Form — handled by FormSubmit =====

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
