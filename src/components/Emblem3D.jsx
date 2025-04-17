import { useRef, useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// Subtle background glow animation
const pulseBackground = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

// Subtle letter pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;

// Letter fade-in animation
const fadeIn = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(10px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

// Subtle specular highlight animation
const highlightShift = keyframes`
  0% {
    background-position: 120% 0%;
  }
  50% {
    background-position: -20% 100%;
  }
  100% {
    background-position: 120% 0%;
  }
`;

const EmblemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  margin: 0 auto; /* Removed top/bottom margin */
  padding-bottom: 3rem; /* Added padding at bottom to shift up */
  transform: translateY(-20px); /* Move up by 20px */
`;

const Text3D = styled.div`
  position: relative;
  transform-style: preserve-3d;
  letter-spacing: 0.05em;
  display: flex;
  animation: ${pulse} 8s ease-in-out infinite;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.08));
`;

// More red-focused styling with consistent color and shadow across all letters
const Letter = styled.span`
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  font-size: 8.5rem;
  font-weight: 800;
  font-family: var(--font-display);
  font-stretch: condensed;
  letter-spacing: -0.01em;
  
  /* Tall, narrow styling with flared serifs */
  width: 0.7em;
  margin: 0 0.05em;
  
  /* More vibrant red primary color */
  color: #ff1a1a;
  
  /* Brighter, more vibrant red gradient */
  background: linear-gradient(
    135deg,
    #ff3333 0%,  /* Brighter red */
    #ff0000 15%, /* Pure red */
    #ff1a1a 30%, /* Bright red */
    #f50000 50%, /* Vibrant red */
    #e60000 70%, /* Rich red */
    #cc0000 100% /* Deep red but still vibrant */
  );
  
  /* Clip background to text */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  
  /* Red-tinted gloss highlight - consistent for all letters */
  &::before {
    content: attr(data-letter);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      transparent 45%,
      rgba(255, 220, 220, 0.95) 47%, /* Light red-pink highlight */
      rgba(255, 235, 235, 0.6) 49%,  /* Lighter red-pink */
      rgba(255, 220, 220, 0.3) 51%,  /* Fading light red-pink */
      transparent 55%,
      transparent 100%
    );
    background-size: 300% 300%;
    background-position: 0% 0%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    z-index: 5;
    animation: ${highlightShift} 7s ease-in-out infinite;
    filter: blur(0.5px);
    opacity: 0.95;
  }
  
  /* Lighter shadow with consistent angle */
  &::after {
    content: attr(data-letter);
    position: absolute;
    left: 4px;          /* Adjusted for consistent angle */
    top: 4px;           /* Adjusted for consistent angle */
    z-index: -1;
    color: #a30000;     /* Lighter red shadow */
    -webkit-text-fill-color: #a30000;
    text-fill-color: #a30000;
    transform: translateZ(-12px) skewX(-2deg); /* Added skewX to match angle */
    filter: blur(2.5px);  /* Reduced blur for sharper but lighter shadow */
    opacity: 0.85;        /* Reduced opacity for lighter shadow */
  }
  
  /* Lighter text shadow */
  text-shadow: 
    0 1px 0 rgba(255, 220, 220, 0.5),  /* Brighter top highlight */
    0 -1px 0 rgba(153, 0, 0, 0.4),     /* Medium bottom shadow */
    3px 3px 5px rgba(153, 0, 0, 0.25); /* Lighter shadow overall */
  
  /* Individual letter fade-in animation */
  animation: ${fadeIn} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  
  /* Dynamic hover state */
  transition: transform 0.3s ease;
  &:hover {
    transform: translateZ(10px) scale(1.05);
  }

  /* Ensure consistent rendering across browsers */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// Red-tinted halo effect
const Halo = styled.div`
  position: absolute;
  top: -15%;
  left: -15%;
  width: 130%;
  height: 130%;
  background: radial-gradient(
    circle at center,
    rgba(255, 220, 220, 0.12) 0%, /* Light red-pink */
    rgba(255, 0, 0, 0.08) 40%,    /* Pure red */
    rgba(173, 0, 0, 0.04) 60%,    /* Deep red */
    transparent 70%
  );
  filter: blur(8px);
  z-index: -2;
  border-radius: 40%;
  transform: translateZ(-20px);
`;

// Create a unique ID for this component instance
const getUniqueId = () => `emblem3d-${Math.random().toString(36).substring(2, 9)}`;

const Emblem3D = ({ text = "TRI" }) => {
  const containerRef = useRef(null);
  const emblemRef = useRef(null);
  const uniqueId = useRef(getUniqueId());
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState(0);
  const [bifurcationParam, setBifurcationParam] = useState(3.2);
  
  // Vector basis for rotational transformations
  const basisVectors = useMemo(() => {
    return {
      x: [1, 0, 0],
      y: [0, 1, 0],
      z: [0, 0, 1]
    };
  }, []);
  
  // Matrix multiplication for 3D transformations
  const multiplyMatrixVector = (matrix, vector) => {
    return [
      matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
      matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
      matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
    ];
  };
  
  // Create rotation matrix around specified axis
  const createRotationMatrix = (axis, angle) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    
    const [x, y, z] = axis;
    
    return [
      [t*x*x + c, t*x*y - s*z, t*x*z + s*y],
      [t*x*y + s*z, t*y*y + c, t*y*z - s*x],
      [t*x*z - s*y, t*y*z + s*x, t*z*z + c]
    ];
  };

  // Add a public ID to the component for the plane animation to target
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.id = uniqueId.current;
      
      // Make position and size information available to the PlaneAnimation component
      window.emblem3DInfo = {
        id: uniqueId.current,
        getBoundingClientRect: () => {
          if (!containerRef.current) return null;
          return containerRef.current.getBoundingClientRect();
        }
      };
    }
    
    return () => {
      window.emblem3DInfo = undefined;
    };
  }, []);
  
  // Advanced mathematical rotation system
  useEffect(() => {
    if (!containerRef.current || !emblemRef.current) return;
    
    const handleMouseMove = (e) => {
      const container = containerRef.current.getBoundingClientRect();
      const centerX = container.left + container.width / 2;
      const centerY = container.top + container.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Normalized vector from center to mouse position
      const dx = (mouseX - centerX) / (container.width / 2);
      const dy = -(mouseY - centerY) / (container.height / 2); // Inverted Y for intuitive rotation
      
      // Calculate rotation angles
      const angleX = Math.atan2(dy, 1) * 15; // Pitch
      const angleY = Math.atan2(dx, 1) * 15; // Yaw
      
      // Create rotation matrices
      const rotX = createRotationMatrix(basisVectors.x, angleX * Math.PI / 180);
      const rotY = createRotationMatrix(basisVectors.y, angleY * Math.PI / 180);
      
      // Apply rotation using CSS transform
      emblemRef.current.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      
      // Adjust bifurcation parameter based on mouse position
      // This creates a subtle chaotic behavior when moving near certain thresholds
      const newBifParam = 3.2 + (Math.abs(dx) * Math.abs(dy)) * 0.8;
      setBifurcationParam(newBifParam);
    };
    
    // Apply mathematically interesting auto-rotation when not interacting
    let animationId;
    
    const animate = () => {
      setTime(prevTime => prevTime + 0.01);
      
      // Only apply auto-animation when not hovered
      if (!isHovered && emblemRef.current) {
        // Logistic map inspired bifurcation behavior
        const r = bifurcationParam;
        let x = 0.5; // Initial condition
        
        // Iterate logistic map a few times for chaotic behavior
        for (let i = 0; i < 10; i++) {
          x = r * x * (1 - x);
        }
        
        // Use sin/cos with phase modulation for smooth rotation
        // This creates a quasi-periodic motion with subtle variations
        const phase = time * 0.5;
        const rotateY = 3 * Math.sin(phase) * Math.cos(phase * 0.31);
        const rotateX = 2 * Math.sin(phase * 0.47) * Math.cos(phase * 0.77);
        
        // Add small chaotic perturbation from logistic map
        const chaosFactorY = (x - 0.5) * 2;
        const chaosFactorX = (x - 0.5) * 1.5;
        
        emblemRef.current.style.transform = 
          `rotateX(${rotateX + chaosFactorX}deg) rotateY(${rotateY + chaosFactorY}deg)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, time, bifurcationParam, basisVectors]);

  // Add hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <EmblemContainer 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text3D 
        ref={emblemRef}
        style={{ 
          transform: 'rotateX(10deg) rotateY(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <Halo />
        {text.split('').map((letter, index) => (
          <Letter 
            key={index} 
            data-letter={letter}
            delay={`${index * 0.15}s`}
          >
            {letter}
          </Letter>
        ))}
      </Text3D>
    </EmblemContainer>
  );
};

export default Emblem3D;