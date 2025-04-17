import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';
import AccentLine from '../components/AccentLine';
import MathGraph from '../components/MathGraph';
 
// Styled components
const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 7rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectsHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ProjectsTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  
  span {
    color: var(--primary-color);
  }
`;

const ProjectsDescription = styled.p`
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.7rem 1.5rem;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--surface-color)'};
  color: ${props => props.$active ? 'white' : 'var(--text-color)'};
  border: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  border-radius: var(--border-radius-md);
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--surface-light)'};
    transform: translateY(-2px);
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

const Projects = () => {
  const projectsRef = useRef(null);
  const isInView = useInView(projectsRef, { once: true, margin: "-100px 0px" });
  const projectsControls = useAnimation();
  
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [categories, setCategories] = useState(['all']);
  
  // Mock data for the projects
  useEffect(() => {
    // This would typically come from an API call
    const projectsData = [
      {
        id: 1,
        title: 'White-mirror',
        description: 'A gaslightning detector messenger app with AI chatbot integration.',
        image: '/Demo_gaslight.png',
        category: 'web',
        tags: ['React', 'Tailwind', 'FastAPI', 'PostgreSQL', 'Websocket','Python']
      },
      {
        id: 2,
        title: 'Remote Classifier',
        description: 'AI website that detects skin cancer',
        image: '/remoteclassier.jpg',
        category: 'AI',
        tags: ['React', 'Python', 'MindsDB']
      },
      {
        id: 3,
        title: 'Full-stack Booking Managemnet',
        description: 'A Full-stack Django booking management',
        image: '',
        category: 'web',
        tags: ['React', 'Django', 'Google Authentication']
      },
      {
        id: 4,
        title: 'Sustainability App',
        description: 'A Figma conceptual demonstration of controlling Scope 3 emission in Taipei',
        image: '',
        category: 'App',
        tags: ['Figma']
      }
    ];
    
    setProjects(projectsData);
    setFilteredProjects(projectsData);
    
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(projectsData.map(project => project.category))];
    setCategories(uniqueCategories);
  }, []);
  
  // Filter projects when the active filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);
  
  // Handle filter button clicks
  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };
  
  // Handle project card clicks
  const handleProjectClick = (project) => {
    // This would typically navigate to a project detail page
    console.log('Project clicked:', project);
  };
  
  return (
    <ProjectsContainer>
      <ProjectsHeader>
        <ProjectsTitle>
          My <span>Projects</span>
        </ProjectsTitle>
        
        <ProjectsDescription>
          A collection of my work across web, mobile, and 3D design. Each project showcases different skills and technologies.
        </ProjectsDescription>
        
        <AccentLine width="150px" margin="0 auto 2rem" />
        
        <FilterContainer>
          {categories.map((category) => (
            <FilterButton 
              key={category}
              $active={activeFilter === category}
              onClick={() => handleFilterChange(category)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
      </ProjectsHeader>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.length > 0 ? (
            <ProjectGrid
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    onClick={() => handleProjectClick(project)}
                  />
                </motion.div>
              ))}
            </ProjectGrid>
          ) : (
            <EmptyState>
              <h3>No projects found</h3>
              <p>Try selecting a different category.</p>
            </EmptyState>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;