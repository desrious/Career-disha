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
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };
    let isActive = false;
    
    // Safety check for SSR / build environments
    if (typeof window === 'undefined') return;
    
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    // Desktop-only media query: only enable on screens >= 1024px
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

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
      if (prefersReducedMotion.matches || !desktopQuery.matches || isActive) {
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
      isActive = true;
      loop();
    };

    const destroy = () => {
      if (canvas && canvas.parentNode) canvas.remove();
      canvas = null;
      context = null;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      isActive = false;
    };

    // Handle reduced motion preference changes
    const onReducedMotionChange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    // Handle screen size changes — enable/disable dynamically
    const onDesktopQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        init();
      } else {
        destroy();
      }
    };

    prefersReducedMotion.addEventListener('change', onReducedMotionChange);
    desktopQuery.addEventListener('change', onDesktopQueryChange);

    // Only init if on desktop
    init();

    return () => {
      destroy();
      prefersReducedMotion.removeEventListener('change', onReducedMotionChange);
      desktopQuery.removeEventListener('change', onDesktopQueryChange);
    };
  }, [color, zIndex]);

  return null; // This component doesn't render any visible JSX
};

export default FollowCursor;
