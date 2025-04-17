import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled components
const Item = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  padding-bottom: ${props => props.$isLast ? '0' : '3rem'};
`;

const Point = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  z-index: 2;
`;

const Line = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  width: 1px;
  height: ${props => props.$isLast ? '0' : 'calc(100% - 16px)'};
  background-color: var(--surface-light);
  z-index: 1;
`;

const Content = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const Company = styled.span`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1rem;
`;

const Date = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-family: var(--font-mono);
`;

const Body = styled.div`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: var(--surface-light);
  color: var(--primary-color);
  font-size: 0.8rem;
  border-radius: var(--border-radius-sm);
`;

const TimelineItem = ({ title, subtitle, date, tags, isLast, children }) => {
  return (
    <Item
      $isLast={isLast}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Point 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <Line $isLast={isLast} />
      
      <Content>
        <Header>
          <Title>{title}</Title>
          <Subtitle>
            <Company>{subtitle}</Company>
            <Date>{date}</Date>
          </Subtitle>
        </Header>
        
        <Body>{children}</Body>
        
        {tags && (
          <Tags>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </Content>
    </Item>
  );
};

TimelineItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isLast: PropTypes.bool,
  children: PropTypes.node
};

export default TimelineItem;