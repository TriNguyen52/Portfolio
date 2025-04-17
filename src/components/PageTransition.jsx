import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * PageTransition - Wrapper component to add animations when navigating between pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
const PageTransition = ({ children }) => {
  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-5vw',
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: '5vw',
    }
  };

  // Transition settings
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTransition;