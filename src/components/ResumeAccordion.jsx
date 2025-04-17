import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled components
const AccordionContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const AccordionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--surface-color);
  cursor: pointer;
  user-select: none;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.$isOpen ? 'var(--primary-color)' : 'var(--text-color)'};
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${props => props.$isOpen ? 'var(--primary-color)' : 'var(--text-secondary)'};
`;

const Content = styled(motion.div)`
  padding: 0;
  overflow: hidden;
  background-color: var(--surface-color);
`;

const ContentInner = styled.div`
  padding: 0.5rem 1.5rem 1.5rem;
`;

const ResumeAccordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader
        onClick={toggleAccordion}
        whileHover={{ backgroundColor: 'var(--surface-light)' }}
        whileTap={{ scale: 0.99 }}
      >
        <Title $isOpen={isOpen}>{title}</Title>
        <IconContainer $isOpen={isOpen} animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconContainer>
      </AccordionHeader>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Content
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ContentInner>{children}</ContentInner>
          </Content>
        )}
      </AnimatePresence>
    </AccordionContainer>
  );
};

ResumeAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool
};

export default ResumeAccordion;