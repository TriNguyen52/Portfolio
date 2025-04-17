import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PlaneContainer = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: visible;
  margin: 2rem 0;
`;

const Plane = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  transform-origin: center center;
  z-index: 100;
  
  svg {
    width: 100%;
    height: 100%;
    fill: white;
    filter: drop-shadow(0 0 15px var(--accent-color));
  }
`;

const PlaneTrail = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 12px;
  background-color: var(--primary-light);
  border-radius: 2px;
  opacity: 0.8;
`;

const PlaneAnimation = () => {
  const containerRef = useRef(null);
  const trailsRef = useRef([]);
  const animationRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const [emblemRect, setEmblemRect] = useState(null);
  
  // Find the Emblem3D component's position
  const updateEmblemRect = () => {
    if (window.emblem3DInfo) {
      try {
        const rect = window.emblem3DInfo.getBoundingClientRect();
        if (rect) {
          setEmblemRect(rect);
          return rect;
        }
      } catch (err) {
        // Silent error
      }
    }
    
    // Fallback if emblem3DInfo is not available - use center of container
    if (!containerRef.current) return null;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const left = containerWidth / 2 - 125;
    const top = containerHeight / 2 - 75;
    
    return {
      left,
      top,
      width: 250,
      height: 150,
      right: left + 250,
      bottom: top + 150
    };
  };

  // Calculate the plane's flight path - an elliptical orbit around the 3D text
  const calculatePosition = (time) => {
    if (!containerRef.current) return { x: 0, y: 0, angle: 0 };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Get the current rect or update if not available
    const currentRect = emblemRect || updateEmblemRect();
    if (!currentRect) return { x: 0, y: 0, angle: 0 };
    
    // Convert emblem coordinates to be relative to container
    const emblemLeft = currentRect.left - containerRect.left;
    const emblemTop = currentRect.top - containerRect.top;
    const emblemWidth = currentRect.width;
    const emblemHeight = currentRect.height;
    
    // Center of the emblem relative to container
    const centerX = emblemLeft + emblemWidth / 2;
    const centerY = emblemTop + emblemHeight / 2;
    
    // Size of the elliptical path
    const radiusX = Math.max(emblemWidth, 200) * 0.8;
    const radiusY = Math.max(emblemHeight, 100) * 0.8;
    
    // Calculate position on the elliptical path
    const x = centerX + radiusX * Math.cos(time);
    const y = centerY + radiusY * Math.sin(time * 1.2);
    
    // Calculate rotation angle based on movement direction
    const angle = Math.atan2(
      y - lastPositionRef.current.y,
      x - lastPositionRef.current.x
    ) * 180 / Math.PI;
    
    // Update the last position
    lastPositionRef.current = { x, y };
    
    return { x, y, angle };
  };
  
  // Create a trail effect
  const createTrail = (x, y) => {
    if (!containerRef.current) return;
    
    const trail = document.createElement('div');
    trail.className = 'plane-trail';
    trail.style.position = 'absolute';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.width = '3px';
    trail.style.height = '12px';
    trail.style.backgroundColor = 'rgba(255, 50, 50, 0.8)';
    trail.style.borderRadius = '2px';
    trail.style.zIndex = '95';
    trail.style.boxShadow = '0 0 5px rgba(255, 50, 50, 0.8)';
    
    // Fade out and remove the trail
    const fadeOut = () => {
      let opacity = 0.8;
      const interval = setInterval(() => {
        opacity -= 0.05;
        if (opacity <= 0) {
          clearInterval(interval);
          trail.remove();
        } else {
          trail.style.opacity = opacity.toString();
        }
      }, 50);
    };
    
    containerRef.current.appendChild(trail);
    trailsRef.current.push(trail);
    
    // Start fade out after a short delay
    setTimeout(fadeOut, 200);
    
    // Remove old trails if there are too many
    if (trailsRef.current.length > 30) {
      const oldTrail = trailsRef.current.shift();
      oldTrail?.remove();
    }
  };

  // Animation loop
  useEffect(() => {
    // Initial update to find the emblem position after a short delay
    setTimeout(() => {
      try {
        updateEmblemRect();
      } catch (err) {
        // Silent error
      }
    }, 500);
    
    let time = 0;
    let lastTrailTime = 0;
    
    const animate = (timestamp) => {
      if (!containerRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      time += 0.01;
      const { x, y, angle } = calculatePosition(time);
      
      // Update plane position and rotation
      const plane = containerRef.current.querySelector('.plane');
      if (plane) {
        plane.style.left = `${x - 25}px`;
        plane.style.top = `${y - 25}px`;
        plane.style.transform = `rotate(${angle + 90}deg)`;
      }
      
      // Add trails at intervals
      if (timestamp - lastTrailTime > 100) {
        createTrail(x, y);
        lastTrailTime = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Update emblem position on resize
    const handleResize = () => {
      updateEmblemRect();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Periodically check for emblem position updates
    const positionInterval = setInterval(() => {
      updateEmblemRect();
    }, 3000);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      clearInterval(positionInterval);
      
      // Clean up trails
      trailsRef.current.forEach(trail => trail.remove());
      trailsRef.current = [];
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PlaneContainer ref={containerRef}>
      <Plane className="plane" initial={{ x: 0, y: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </Plane>
    </PlaneContainer>
  );
};

export default PlaneAnimation;