import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.12;
  z-index: -5;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const MathGraph = ({ type = 'resonance' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Vector field visualization
    const drawVectorField = (ctx, time) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      
      const cellSize = 30;
      const rows = Math.floor(height / cellSize);
      const cols = Math.floor(width / cellSize);
      
      ctx.strokeStyle = 'var(--primary-color)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellSize + cellSize / 2;
          const y = i * cellSize + cellSize / 2;
          
          // Calculate vector field based on position and time
          const angle = Math.sin(x * 0.01 + time * 0.2) * Math.cos(y * 0.01 + time * 0.3);
          const length = 10 + 5 * Math.sin(time * 0.2 + x * 0.01 + y * 0.01);
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle) * length,
            y + Math.sin(angle) * length
          );
          ctx.stroke();
          
          // Draw small circle at arrow start
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'var(--primary-color)';
          ctx.fill();
        }
      }
    };
    
    // Basis transformation visualization
    const drawBasisTransformation = (ctx, time) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const gridSize = 20;
      const gridLines = 15;
      
      // Transform matrix that changes over time
      const a = Math.cos(time * 0.3) * 1.5;
      const b = Math.sin(time * 0.5) * 0.5;
      const c = Math.sin(time * 0.4) * 0.5;
      const d = Math.cos(time * 0.2) * 1.5;
      
      // Draw grid
      ctx.strokeStyle = 'rgba(var(--primary-rgb), 0.5)';
      ctx.lineWidth = 0.5;
      
      for (let i = -gridLines; i <= gridLines; i++) {
        // Draw horizontal line
        const startX = -gridLines * gridSize;
        const startY = i * gridSize;
        const endX = gridLines * gridSize;
        const endY = i * gridSize;
        
        // Apply transformation
        const [transformedStartX, transformedStartY] = [
          a * startX + b * startY,
          c * startX + d * startY
        ];
        
        const [transformedEndX, transformedEndY] = [
          a * endX + b * endY,
          c * endX + d * endY
        ];
        
        ctx.beginPath();
        ctx.moveTo(centerX + transformedStartX, centerY + transformedStartY);
        ctx.lineTo(centerX + transformedEndX, centerY + transformedEndY);
        ctx.stroke();
        
        // Draw vertical line
        const vStartX = i * gridSize;
        const vStartY = -gridLines * gridSize;
        const vEndX = i * gridSize;
        const vEndY = gridLines * gridSize;
        
        // Apply transformation
        const [transformedVStartX, transformedVStartY] = [
          a * vStartX + b * vStartY,
          c * vStartX + d * vStartY
        ];
        
        const [transformedVEndX, transformedVEndY] = [
          a * vEndX + b * vEndY,
          c * vEndX + d * vEndY
        ];
        
        ctx.beginPath();
        ctx.moveTo(centerX + transformedVStartX, centerY + transformedVStartY);
        ctx.lineTo(centerX + transformedVEndX, centerY + transformedVEndY);
        ctx.stroke();
      }
      
      // Draw basis vectors
      ctx.lineWidth = 2;
      
      // x basis vector
      ctx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + a * gridSize * 3, centerY + c * gridSize * 3);
      ctx.stroke();
      
      // y basis vector
      ctx.strokeStyle = 'rgba(50, 50, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + b * gridSize * 3, centerY + d * gridSize * 3);
      ctx.stroke();
    };
    
    // Bifurcation diagram visualization
    const drawBifurcationDiagram = (ctx, time) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      
      const maxIterations = 100;
      const stepSize = width / maxIterations;
      
      ctx.strokeStyle = 'var(--primary-color)';
      ctx.lineWidth = 0.5;
      
      // Animate the r parameter range
      const minR = 2.8 + 0.2 * Math.sin(time * 0.2);
      const maxR = 4.0;
      
      // For each r in the range
      for (let i = 0; i < width; i += 2) {
        const r = minR + (maxR - minR) * (i / width);
        let x = 0.5; // Initial value
        
        // Skip some iterations to reach the attractor
        for (let j = 0; j < 100; j++) {
          x = r * x * (1 - x);
        }
        
        // Plot points on the attractor
        for (let j = 0; j < 50; j++) {
          x = r * x * (1 - x);
          const y = height - (x * height);
          
          ctx.beginPath();
          ctx.arc(i, y, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    // Sine and cosine resonance visualization
    const drawResonance = (ctx, time) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      
      const centerY = height / 2;
      
      // Parameters that change over time
      const frequency1 = 0.02 + 0.01 * Math.sin(time * 0.1);
      const frequency2 = 0.03 + 0.01 * Math.sin(time * 0.11);
      const phase = time * 0.5;
      
      // Draw sine wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(var(--primary-rgb), 0.6)';
      ctx.lineWidth = 1.5;
      
      for (let x = 0; x < width; x++) {
        const y = centerY - 50 * Math.sin(x * frequency1 + phase);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw cosine wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(var(--secondary-rgb), 0.6)';
      ctx.lineWidth = 1.5;
      
      for (let x = 0; x < width; x++) {
        const y = centerY - 50 * Math.cos(x * frequency2 + phase * 0.7);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw resonance (combined wave)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < width; x++) {
        const y = centerY - 
          30 * Math.sin(x * frequency1 + phase) - 
          30 * Math.cos(x * frequency2 + phase * 0.7);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };
    
    // Animation loop
    const animate = () => {
      time += 0.01;
      
      switch(type) {
        case 'vector':
          drawVectorField(ctx, time);
          break;
        case 'basis':
          drawBasisTransformation(ctx, time);
          break;
        case 'bifurcation':
          drawBifurcationDiagram(ctx, time);
          break;
        case 'resonance':
        default:
          drawResonance(ctx, time);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type]);
  
  return (
    <GraphContainer>
      <Canvas ref={canvasRef} />
    </GraphContainer>
  );
};

export default MathGraph;