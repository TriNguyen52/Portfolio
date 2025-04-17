import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled components for the accent line
const LineContainer = styled(motion.div)`
  position: relative;
  width: ${props => props.$width || '100px'};
  height: ${props => props.$height || '3px'};
  margin: ${props => props.$margin || '2rem 0'};
  align-self: ${props => props.$align || 'center'};
  overflow: hidden;
`;

const Line = styled(motion.div)`
  height: 3px;
  width: ${props => props.$width || '50px'};
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 3px;
  margin: ${props => props.$margin || '0'};
`;

const Pulse = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  background: white;
  filter: blur(3px);
`;

/**
 * AccentLine Component - A decorative animated line
 * @param {Object} props - Component props
 * @param {string} props.width - Width of the line (CSS value)
 * @param {string} props.height - Height of the line (CSS value)
 * @param {string} props.color - Color of the line
 * @param {string} props.margin - Margin around the line (CSS value)
 * @param {string} props.align - Alignment of the line (CSS value)
 * @param {boolean} props.gradient - Whether to apply a gradient effect
 * @param {boolean} props.animate - Whether to animate the line
 */
const AccentLine = ({ 
  width, 
  height, 
  color, 
  margin, 
  align,
  gradient = true,
  animate = true 
}) => {
  return (
    <LineContainer
      $width={width}
      $height={height}
      $margin={margin}
      $align={align}
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Line 
        $width={width} 
        $margin={margin}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {animate && (
        <Pulse
          animate={{
            x: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      )}
    </LineContainer>
  );
};

AccentLine.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
  align: PropTypes.string,
  gradient: PropTypes.bool,
  animate: PropTypes.bool
};

export default AccentLine;