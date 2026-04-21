import React, { useEffect } from 'react';

interface FollowCursorProps {
  color?: string;
  zIndex?: number;
}

const FollowCursor: React.FC<FollowCursorProps> = ({
  color = '#fba70c', // Updated to match the site's gold theme
  zIndex = 9999,
}) => {
  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };
    
    // Safety check for SSR / build environments
    if (typeof window === 'undefined') return;
    
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    class Dot {
      position: { x: number; y: number };
      width: number;
      lag: number;

      constructor(x: number, y: number, width: number, lag: number) {
        this.position = { x, y };
        this.width = width;
        this.lag = lag;
      }

      moveTowards(dx: number, dy: number, ctx: CanvasRenderingContext2D) {
        this.position.x += (dx - this.position.x) / this.lag;
        this.position.y += (dy - this.position.y) / this.lag;
        
        ctx.beginPath();
        ctx.arc(
          this.position.x,
          this.position.y,
          this.width,
          0,
          2 * Math.PI
        );
        
        // Glassy Fill
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = color;
        ctx.fill();
        
        // Glassy border reflection
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        
        // Add subtle shadow for depth
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        ctx.globalAlpha = 1.0; // Reset alpha
        ctx.closePath();
      }
    }

    // Increased radius from 10 to 15 for a more noticeable glassy surface
    const dot = new Dot(width / 2, height / 2, 15, 10);

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);
        dot.moveTowards(cursor.x, cursor.y, context);
      }
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log('Reduced motion enabled, cursor effect skipped.');
        return;
      }

      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.width = width;
      canvas.height = height;
      canvas.style.zIndex = zIndex.toString();
      document.body.appendChild(canvas);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      loop();
    };

    const destroy = () => {
      if (canvas && canvas.parentNode) canvas.remove();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();

    return () => {
      destroy();
    };
  }, [color, zIndex]);

  return null; // This component doesn't render any visible JSX
};

export default FollowCursor;
