import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import AccentLine from '../components/AccentLine';

// Styled components
const ContactContainer = styled.div`
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
`;

const ContactTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
`;

const ContactFormContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background-color: var(--surface-color);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  }
`;

const GridBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--surface-light) 1px, transparent 1px),
                    linear-gradient(90deg, var(--surface-light) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0;
  opacity: 0.05;
  z-index: -1;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--surface-light);
  color: var(--text-color);
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all var(--transition-normal);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 170, 255, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--surface-light);
  color: var(--text-color);
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  font-family: var(--font-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all var(--transition-normal);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 170, 255, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PlaneIcon = styled(motion.div)`
  position: relative;
  width: 20px;
  height: 20px;
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(0, 200, 80, 0.1);
  border-left: 4px solid rgb(0, 200, 80);
  padding: 1rem;
  margin: 2rem 0;
  border-radius: var(--border-radius-sm);
  color: rgb(0, 200, 80);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--surface-color);
  color: var(--text-secondary);
  border-radius: 50%;
  font-size: 1.5rem;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  
  &:hover {
    color: var(--primary-color);
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
  }
`;

const FlightPath = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaneTakingOff, setIsPlaneTakingOff] = useState(false);
  const formRef = useRef(null);
  const planeRef = useRef(null);
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Start plane animation
    setIsPlaneTakingOff(true);
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsPlaneTakingOff(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };
  
  const isFormValid = formData.name && formData.email && formData.message;
  
  return (
    <ContactContainer>
      <ContactHeader>
        <ContactTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </ContactTitle>
        
        <AccentLine width="100px" margin="0 auto 2rem" />
        
        <ContactSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a question or want to work together? Send me a message and let's connect.
        </ContactSubtitle>
      </ContactHeader>
      
      <ContactFormContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GridBackground 
          animate={{ 
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {isPlaneTakingOff && (
          <FlightPath>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 600 400"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <motion.path
                d="M 300,350 Q 300,150 500,50"
                fill="transparent"
                stroke="rgba(0, 170, 255, 0.2)"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
            
            <motion.div
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                top: 0,
                left: 0,
                zIndex: 100
              }}
              initial={{ x: 285, y: 335, rotate: -45 }}
              animate={{ x: 550, y: 0, rotate: -80, scale: 0.5 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v-2l-8-4V5.5C13 4.67 12.33 4 11.5 4S10 4.67 10 5.5V9l-8 4v2l8-2.5V17l-2 1.5V20l3.5-1 3.5 1v-1.5L13 17v-4.5l8 2.5z" fill="var(--primary-color)"/>
              </svg>
            </motion.div>
          </FlightPath>
        )}
        
        <AnimatePresence>
          {isSubmitted && (
            <SuccessMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="rgb(0, 200, 80)" strokeWidth="2" />
                <path d="M8 12L11 15L16 10" stroke="rgb(0, 200, 80)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Message sent successfully! I'll get back to you as soon as possible.
            </SuccessMessage>
          )}
        </AnimatePresence>
        
        <form ref={formRef} onSubmit={handleSubmit}>
          <FormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </FormGroup>
          
          <FormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </FormGroup>
          
          <FormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FormLabel htmlFor="message">Message</FormLabel>
            <FormTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={!isFormValid || isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {isSubmitting ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sending...
              </motion.span>
            ) : (
              <>
                <motion.span>Send Message</motion.span>
                <PlaneIcon 
                  ref={planeRef}
                  whileHover={{ 
                    rotate: [0, -10, 0, -10, 0],
                    y: [0, -2, 0, -2, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v-2l-8-4V5.5C13 4.67 12.33 4 11.5 4S10 4.67 10 5.5V9l-8 4v2l8-2.5V17l-2 1.5V20l3.5-1 3.5 1v-1.5L13 17v-4.5l8 2.5z" fill="white"/>
                  </svg>
                </PlaneIcon>
              </>
            )}
          </SubmitButton>
        </form>
      </ContactFormContainer>
      
      <SocialLinks
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <SocialLink 
          href="https://github.com/TriNguyen52" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub"
          whileHover={{ y: -5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.417 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
          </svg>
        </SocialLink>
        
        <SocialLink 
          href="https://www.linkedin.com/in/tri-nguyen52/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
          whileHover={{ y: -5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 9h4v12H2V9zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SocialLink>
        
        <SocialLink 
          href="mailto:ngminhtri52@gmail.com" 
          aria-label="Email"
          whileHover={{ y: -5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact;