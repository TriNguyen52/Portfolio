import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AccentLine from '../components/AccentLine';
import TimelineItem from '../components/TimelineItem';
import ResumeAccordion from '../components/ResumeAccordion';

// Styled components
const ResumeContainer = styled.div`
  min-height: 100vh;
  padding: 7rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResumeHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const ResumeTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  
  span {
    color: var(--primary-color);
  }
`;

const ResumeDescription = styled.p`
  max-width: 700px;
  margin: 0 auto 2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const ResumeContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), transparent);
    border-radius: 3px;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    width: 2px;
    background-color: var(--surface-light);
  }
`;

const SkillsSection = styled.div`
  margin-top: 3rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background-color: var(--surface-color);
  border-radius: var(--border-radius-md);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SkillName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
`;



const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 2rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 10px;
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Resume = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState('technical');
  
  // Mock data for education
  const educationData = [
    {
      id: 'edu1',
      title: 'Bachelor of Computer Science and Mathematics',
      institution: 'Minerva University',
      date: '2023 - 2027',
      description: 'Specialized in Data Science and Mathematics'
    }
  ];
  
  // Mock data for experience
  const experienceData = [
    {
      id: 'exp1',
      title: 'Web Developer',
      institution: 'Seoul Nooks',
      date: 'Jan, 2025 - Present',
      description: 'Developing a dynamic booking interface using React, Tailwind CSS, and plugins (such as Flatpickr), with responsive design, real-time room availability, and lazy-loaded image galleries, improving page load times by 40%'
    },
    {
      id: 'exp2',
      title: 'Software Developer',
      institution: 'Ln Data, Inc.',
      date: 'Sep, 2024 - Dec, 2024',
      description: 'Created interactive digital experiences for clients in retail, education, and entertainment industries. Developed web-based AR prototypes and 3D product configurators.'
    },
    {
      id: 'exp3',
      title: 'Admission Data Analyst',
      institution: 'Minerva University',
      date: 'Aug, 2014 - Present',
      description: 'Designed user interfaces for mobile applications. Conducted user research and usability testing for various mobile projects.'
    }
  ];
  
  // Technical skills data
  const technicalSkills = [
    { name: 'React', icon: '⚛️' },
    { name: 'Three.js', icon: '🧊' },
    { name: 'JavaScript',  icon: 'JS' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'WebGL',  icon: '🌐' },
    { name: 'CSS/SCSS',  icon: '🎨' },
    { name: 'Node.js',  icon: '📦' },
    { name: 'React Native',  icon: '📱' }
  ];
  
  // Design skills data
  const designSkills = [
    { name: 'UI Design',  icon: '🖌️' },
    { name: 'UX Design',  icon: '🧠' },
    { name: '3D Modeling',  icon: '🏗️' },
    { name: 'Animation',  icon: '🎬' },
    { name: 'Figma',  icon: '🔍' },
    { name: 'Adobe XD',  icon: '✏️' },
    { name: 'Blender',  icon: '🎮' },
    { name: 'Photoshop', icon: '🖼️' }
  ];
  
  // Skill categories for the accordion
  const skillCategories = [
    {
      id: 'technical',
      title: 'Technical Skills',
      content: technicalSkills
    },
    {
      id: 'design',
      title: 'Design Skills',
      content: designSkills
    }
  ];
  
  return (
    <ResumeContainer>
      <ResumeHeader>
        <ResumeTitle>
          My <span>Resume</span>
        </ResumeTitle>
        
        <ResumeDescription>
          With experience in both design and development, I bring a unique blend of technical expertise and creative problem-solving to digital projects.
        </ResumeDescription>
        
        <AccentLine width="150px" margin="0 auto 2rem" />
      </ResumeHeader>
      
      <ResumeContent>
        <div>
          <Section>
            <SectionTitle>Experience</SectionTitle>
            <TimelineContainer>
              {experienceData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.institution}
                  date={item.date}
                  description={item.description}
                  isLast={index === experienceData.length - 1}
                />
              ))}
            </TimelineContainer>
          </Section>
          
          <Section>
            <SectionTitle>Education</SectionTitle>
            <TimelineContainer>
              {educationData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.institution}
                  date={item.date}
                  description={item.description}
                  isLast={index === educationData.length - 1}
                />
              ))}
            </TimelineContainer>
          </Section>
          
          <DownloadButton
            href="/2025_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="2025_Resume.pdf"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Download Full Resume
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </DownloadButton>
        </div>
        
        <div>
          <SectionTitle>Skills</SectionTitle>
          {skillCategories.map((category) => (
            <ResumeAccordion
              key={category.id}
              title={category.title}
              isActive={activeSkillCategory === category.id}
              onToggle={() => setActiveSkillCategory(
                activeSkillCategory === category.id ? null : category.id
              )}
            >
              <SkillsGrid>
                {category.content.map((skill, index) => (
                  <SkillItem
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                  </SkillItem>
                ))}
              </SkillsGrid>
            </ResumeAccordion>
          ))}
          
          <Section>
            <SectionTitle>Languages</SectionTitle>
            <ResumeAccordion
              title="Communication Skills"
              isActive={true}
            >
              <SkillsGrid>
                <SkillItem>
                  <SkillName>Vietnamese</SkillName>
                  <p>Native</p>
                </SkillItem>
                <SkillItem>
                  <SkillName>English</SkillName>
                  <p>Fluent</p>
                </SkillItem>
              </SkillsGrid>
            </ResumeAccordion>
          </Section>
          
          <Section>
            <SectionTitle>Certificates</SectionTitle>
            <ul>
              <li>CodePath Intermediate Web Development - 2024</li>
              <li>CodePath Introduction to Cybersecurity - 2024</li>
            </ul>
          </Section>
        </div>
      </ResumeContent>
    </ResumeContainer>
  );
};

export default Resume;