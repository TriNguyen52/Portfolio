import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled components
const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background-color: ${props => props.$bgColor || 'var(--surface-color)'};
  cursor: pointer;
  box-shadow: var(--shadow-md);
`;

const CardImage = styled.div`
  width: 100%;
  height: 60%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

const CardContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: rgba(15, 15, 25, 0.95);
  backdrop-filter: blur(10px);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CardTag = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: var(--border-radius-sm);
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ProjectCard = ({ title, description, image, tags, bgColor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card
      $bgColor={bgColor}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <CardImage 
        $image={image}
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardTags>
          {tags.map((tag, index) => (
            <CardTag key={index}>#{tag}</CardTag>
          ))}
        </CardTags>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  bgColor: PropTypes.string,
  onClick: PropTypes.func
};

export default ProjectCard;