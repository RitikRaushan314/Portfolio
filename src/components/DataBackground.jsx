import { useEffect, useRef } from 'react';
import './DataBackground.css';

const FORMULAS = [
  'Σ(x²)', 'μ = x̄/n', 'R² = 0.96', 'σ = √Var(X)', 'P(A|B)',
  'y = mx + b', 'n = 1024', 'df = 4', 'p < 0.05', 'β₁ = 0.73',
  'MSE = ¹⁄ₙ', 'H₀: μ=0', 'χ² test', 'RMSE', 'r = 0.89',
  'λ = 2.5', 'Var(X)', 'E[X]', 'log(L)', 'ΔR² = 0.12',
];

class FloatingFormula {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }

  reset(initial = false) {
    this.text = FORMULAS[Math.floor(Math.random() * FORMULAS.length)];
    this.x = Math.random() * this.canvas.width;
    this.y = initial ? Math.random() * this.canvas.height : this.canvas.height + 20;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = -(Math.random() * 0.3 + 0.15);
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.06 + 0.03;
    this.size = Math.random() * 6 + 10;
    this.fadeIn = true;
    this.life = 0;
    this.maxLife = Math.random() * 600 + 400;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;

    if (this.fadeIn && this.opacity < this.maxOpacity) {
      this.opacity += 0.0008;
      if (this.opacity >= this.maxOpacity) this.fadeIn = false;
    }

    if (this.life > this.maxLife * 0.7) {
      this.opacity -= 0.0006;
    }

    if (this.opacity <= 0 || this.y < -30 || this.life > this.maxLife) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.font = `${this.size}px 'Courier New', monospace`;
    ctx.fillStyle = `rgba(20, 184, 166, ${Math.max(0, this.opacity)})`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

class MiniChart {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = initial ? Math.random() * this.canvas.height : this.canvas.height + 30;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = -(Math.random() * 0.2 + 0.1);
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.05 + 0.025;
    this.fadeIn = true;
    this.life = 0;
    this.maxLife = Math.random() * 700 + 500;
    this.type = Math.floor(Math.random() * 3); // 0=bar, 1=line, 2=scatter
    this.data = Array.from({ length: 5 + Math.floor(Math.random() * 4) }, () => Math.random());
    this.size = Math.random() * 20 + 25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;

    if (this.fadeIn && this.opacity < this.maxOpacity) {
      this.opacity += 0.0006;
      if (this.opacity >= this.maxOpacity) this.fadeIn = false;
    }

    if (this.life > this.maxLife * 0.7) {
      this.opacity -= 0.0004;
    }

    if (this.opacity <= 0 || this.y < -40 || this.life > this.maxLife) {
      this.reset();
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.opacity);
    ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
    ctx.fillStyle = `rgba(20, 184, 166, ${alpha * 0.6})`;
    ctx.lineWidth = 1;

    if (this.type === 0) {
      // Bar chart
      const barW = this.size / this.data.length - 1;
      this.data.forEach((v, i) => {
        const bx = this.x + i * (barW + 1);
        const bh = v * this.size * 0.8;
        ctx.fillRect(bx, this.y + this.size - bh, barW, bh);
      });
      // Axis
      ctx.beginPath();
      ctx.moveTo(this.x - 2, this.y);
      ctx.lineTo(this.x - 2, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.stroke();
    } else if (this.type === 1) {
      // Line chart
      ctx.beginPath();
      this.data.forEach((v, i) => {
        const px = this.x + (i / (this.data.length - 1)) * this.size;
        const py = this.y + this.size - v * this.size * 0.8;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      // Axis
      ctx.beginPath();
      ctx.moveTo(this.x - 2, this.y);
      ctx.lineTo(this.x - 2, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.stroke();
    } else {
      // Scatter plot
      this.data.forEach((v, i) => {
        const px = this.x + (i / (this.data.length - 1)) * this.size;
        const py = this.y + this.size - v * this.size * 0.8;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.beginPath();
      ctx.moveTo(this.x - 2, this.y);
      ctx.lineTo(this.x - 2, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.stroke();
    }
  }
}

export default function DataBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let formulas = [];
    let charts = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Rebuild on document height change
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);

    // Create elements
    const formulaCount = Math.min(18, Math.floor(canvas.width / 100));
    const chartCount = Math.min(10, Math.floor(canvas.width / 180));

    for (let i = 0; i < formulaCount; i++) {
      formulas.push(new FloatingFormula(canvas));
    }
    for (let i = 0; i < chartCount; i++) {
      charts.push(new MiniChart(canvas));
    }

    // Draw faint grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.015)';
      ctx.lineWidth = 0.5;

      const spacing = 80;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      formulas.forEach((f) => {
        f.update();
        f.draw(ctx);
      });
      charts.forEach((c) => {
        c.update();
        c.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="data-background-canvas" />;
}
