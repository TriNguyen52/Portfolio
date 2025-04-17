import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CursorCircle = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-color);
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
`;

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Handle cursor position
  useEffect(() => {
    // Add listener for mouse movement
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add listener for mouse down/up events for click animation
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Add listener for mouse enter/leave for hiding cursor
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Add listener for link hover
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add event listeners to all clickable elements
    const linkElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]');
    
    linkElements.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      linkElements.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Only show custom cursor on non-touch devices
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  if (isTouchDevice()) {
    return null;
  }

  return (
    <>
      <CursorCircle
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
          borderColor: clicked ? 'var(--accent-color)' : linkHovered ? 'var(--primary-light)' : 'var(--primary-color)',
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 700,
          mass: 0.5,
        }}
      />
      <CursorDot
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.5 : linkHovered ? 0 : 1,
          opacity: hidden ? 0 : 1,
          backgroundColor: clicked ? 'var(--accent-color)' : 'var(--primary-color)',
        }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 800,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default Cursor;