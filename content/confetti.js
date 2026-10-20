/**
 * Theme Studio for GitHub - Confetti & Visual FX Engine
 * High-performance, lightweight canvas particle explosion for GitHub interactions.
 */

(function () {
  'use strict';

  class ConfettiEngine {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animId = null;
      this.isActive = false;
    }

    _initCanvas() {
      if (this.canvas) return;
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'theme-studio-confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '999999';
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this._resize();
      window.addEventListener('resize', () => this._resize());
    }

    _resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;
      if (this.ctx) {
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    }

    // Trigger star burst from an element or coordinates
    burstFromElement(element, type = 'star') {
      if (!element) {
        this.burst(window.innerWidth / 2, window.innerHeight / 3, type);
        return;
      }
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      this.burst(x, y, type);
    }

    burst(originX, originY, type = 'mixed') {
      this._initCanvas();
      const colors = type === 'star'
        ? ['#ffd700', '#ffea00', '#ffaa00', '#ffffff', '#ff80ab', '#cba6f7']
        : ['#ff007f', '#00f2fe', '#fee715', '#a6e3a1', '#bd93f9', '#ff79c6', '#88c0d0'];

      const count = type === 'merge' ? 140 : 65;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 12 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = type === 'star' ? (Math.random() > 0.4 ? 'star' : 'circle') : (Math.random() > 0.5 ? 'rect' : 'circle');

        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (type === 'merge' ? 6 : 2),
          size: Math.random() * 7 + 4,
          color: color,
          shape: shape,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.012,
          gravity: 0.35,
          wobble: Math.random() * 10
        });
      }

      if (!this.isActive) {
        this.isActive = true;
        this._loop();
      }
    }

    _loop() {
      if (!this.particles.length) {
        this.isActive = false;
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        return;
      }

      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;
        p.wobble += 0.1;

        if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'star') {
          this._drawStar(this.ctx, 0, 0, 5, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }

      this.animId = requestAnimationFrame(() => this._loop());
    }

    _drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    }
  }

  window.themeConfetti = new ConfettiEngine();
})();
