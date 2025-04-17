import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PlaneAnimation from '../components/PlaneAnimation';
import AccentLine from '../components/AccentLine';
import Emblem3D from '../components/Emblem3D';

// Styled components
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 2rem;
  padding-bottom: 6rem; /* Add more padding at the bottom */
  transform: translateY(-160px); /* Move entire section up by 50px */
`;

const HeroTitle = styled(motion.div)`
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  margin-bottom: 0.5rem; /* Reduced from 1rem */
  letter-spacing: -0.02em;
  position: relative;
  z-index: 5;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  letter-spacing: 0.1em;
  opacity: 0.9;
`;

const IntroSection = styled.section`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const IntroContent = styled.div`
  flex: 1;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const IntroTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    height: 3px;
    width: 60px;
    background-color: var(--primary-color);
  }
`;

const IntroDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const IntroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const IntroAvatar = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const AvatarImage = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background-image: url('/avatar.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    border: 2px dashed var(--primary-light);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--text-secondary);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--surface-light);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
`;

const ScrollArrow = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-right: 2px solid var(--text-secondary);
  border-bottom: 2px solid var(--text-secondary);
  transform: rotate(45deg);
`;

const MathTypeIndicator = styled.div`
  display: block;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-dark);
  }

  span {
    font-size: 0.8rem;
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const charAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, type: 'spring', stiffness: 100 }
  }
};

// Home component
const Home = () => {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, margin: "-100px 0px" });
  const introControls = useAnimation();
  const [mathType, setMathType] = useState('vector'); // Changed to vector field
  
  // Handle scroll to intro section
  const scrollToIntro = () => {
    document.getElementById('intro-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Cycle through math visualizations
  const cycleMathType = () => {
    const types = ['vector', 'basis', 'bifurcation', 'resonance'];
    const currentIndex = types.indexOf(mathType);
    const nextIndex = (currentIndex + 1) % types.length;
    setMathType(types[nextIndex]);
  };
  
  // Animate intro section when it comes into view
  useEffect(() => {
    if (isInView) {
      introControls.start('visible');
    }
  }, [isInView, introControls]);
  
  // Split text for animated rendering
  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span key={index} variants={charAnimation}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };
  
  return (
    <HomeContainer>
      <HeroSection>
        <PlaneAnimation />
        
        <HeroTitle
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <Emblem3D />
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Code. Logic. Travel.
        </HeroSubtitle>
        
        <AccentLine width="100px" margin="0 auto 3rem" />
        
        <ScrollIndicator
          onClick={scrollToIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <ScrollText>Scroll Down</ScrollText>
          <ScrollArrow 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }} 
          />
        </ScrollIndicator>
      </HeroSection>
      
      <IntroSection id="intro-section" ref={introRef}>
        <IntroContent>
          <IntroTitle
            initial="hidden"
            animate={introControls}
            variants={fadeInUp}
            onClick={cycleMathType} // Click to cycle through math types
            style={{ cursor: 'pointer' }}
          >
            Building with Math, Machines, and Music
          </IntroTitle>
          
          <IntroDescription
            initial="hidden"
            animate={introControls}
            variants={fadeInUp}
          >
            I'm a mathematics and computer science enthusiast, currently exploring the intersection of technology and creativity. My journey has taken me through various projects across different countries, each one a unique experience that has shaped my perspective and skills.
          </IntroDescription>
          
          <IntroStats>
            <StatItem
              initial="hidden"
              animate={introControls}
              variants={fadeInUp}
              custom={0}
            >
              <StatNumber>4</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </StatItem>
            <StatItem
              initial="hidden"
              animate={introControls}
              variants={fadeInUp}
              custom={1}
            >
              <StatNumber>6</StatNumber>
              <StatLabel>Countries</StatLabel>
            </StatItem>
            <StatItem
              initial="hidden"
              animate={introControls}
              variants={fadeInUp}
              custom={2}
            >
              <StatNumber>1</StatNumber>
              <StatLabel>Journey</StatLabel>
            </StatItem>
          </IntroStats>
          
          <ButtonContainer
            initial="hidden"
            animate={introControls}
            variants={fadeInUp}
          >
            <Link to="/projects">
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <SecondaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </SecondaryButton>
            </Link>
          </ButtonContainer>
        </IntroContent>
        
        <IntroAvatar
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={introControls}
          variants={{
            visible: { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { delay: 0.3, duration: 0.8 } 
            }
          }}
        >
          <AvatarImage />
        </IntroAvatar>
      </IntroSection>
    </HomeContainer>
  );
};

export default Home;