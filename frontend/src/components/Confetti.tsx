import React, { useEffect, useState, useRef } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#FF80B5', '#FF4D94', '#FF1A75', '#FF0066', '#CC0052'];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      gravity: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 2 + 1,
        gravity: 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        opacity: 1
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      if (!active) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        
        if (particle.y > canvas.height + particle.size) {
          if (Math.random() < 0.1 && active) {
            particles[index].y = -particle.size;
            particles[index].x = Math.random() * canvas.width;
            particles[index].speedY = Math.random() * 2 + 1;
            particles[index].opacity = 1;
          } else {
            particle.opacity = Math.max(0, particle.opacity - 0.05);
          }
        }
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const timer = setTimeout(() => {
      setActive(false);
    }, 5000);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 1s ease-out' }}
    />
  );
};

export default Confetti;