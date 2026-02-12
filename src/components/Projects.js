import React, { useState } from 'react';
import '../styles/Projects.css';

// Import project images
import project1_1 from '../assets/project 1/0.png';
import project1_2 from '../assets/project 1/00.png';
import project1_3 from '../assets/project 1/000.png';
import project1_4 from '../assets/project 1/0000.png';

import project2_1 from '../assets/project 2/1.png';
import project2_2 from '../assets/project 2/11.png';

import project3_1 from '../assets/project 3/2.png';
import project3_2 from '../assets/project 3/22.png';
import project3_3 from '../assets/project 3/222.png';

import project4_1 from '../assets/project 4/33.png';

import project5_0 from '../assets/project 5/0.jpg';
import project5_1 from '../assets/project 5/1.jpg';
import project5_2 from '../assets/project 5/11.jpg';
import project5_3 from '../assets/project 5/2.jpg';

import project6_video from '../assets/project 6/Firefly Initially, the app name -Match Up- appears, followed by an arrow pointing upwards from below.mp4';
import project6_1 from '../assets/project 6/Match Up.jpg';

import project7_1 from '../assets/project 7/1.jpg';
import project7_2 from '../assets/project 7/2.jpg';
import project7_3 from '../assets/project 7/3.jpg';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showVideoForProject, setShowVideoForProject] = useState({});
  const [sectionVisible, setSectionVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#projects');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleVideoEnd = (projectId) => {
    setShowVideoForProject(prev => ({ ...prev, [projectId]: false }));
  };

  const handleCardHover = (projectId, hasVideo) => {
    if (hasVideo && projectId === 6) {
      setShowVideoForProject(prev => ({ ...prev, [projectId]: true }));
    }
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce website with shopping cart, product catalog, and user authentication. Built with React.js and responsive design.',
      technologies: ['HTML', 'CSS3', 'UI/UX'],
      images: [project1_1, project1_2, project1_3, project1_4],
      githubLink: 'https://github.com/AhmadYo12'
    },
    {
      id: 2,
      title: 'Business Landing Page',
      description: 'Professional business landing page with modern design, contact forms, and service showcase. Fully responsive and optimized.',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'UI/UX'],
      images: [project2_1, project2_2],
      githubLink: 'https://github.com/AhmadYo12'
    },
    {
      id: 3,
      title: 'Dashboard Application',
      description: 'Interactive dashboard with data visualization, charts, and admin panel. Clean interface with dark/light mode support.',
      technologies: ['HTML', 'CSS3', 'UI/UX'],
      images: [project3_1, project3_2, project3_3],
      githubLink: 'https://github.com/AhmadYo12'
    },
    {
      id: 4,
      title: 'Working Hours',
      description: 'Employee attendance management system with real-time tracking, shift scheduling, and comprehensive reporting dashboard.',
      technologies: ['React.js', 'Firebase', 'CSS3'],
      images: [project7_2, project7_3, project7_1],
      githubLink: 'https://github.com/AhmadYo12'
    },
    {
      id: 5,
      title: 'Smart University Entry System',
      description: 'Intelligent access control system for university campuses with real-time monitoring and automated student authentication.',
      technologies: ['React.js', 'Arduino Uno', 'ESP32', 'ThingSpeak', 'IoT'],
      images: [project5_0, project5_2, project5_1, project5_3],
      githubLink: 'https://github.com/AhmadYo12',
      youtubeVideo: 'https://www.youtube.com/embed/Gk-LU5aM744?autoplay=1&mute=1',
      youtubeThumbnail: 'https://img.youtube.com/vi/Gk-LU5aM744/maxresdefault.jpg'
    },
    {
      id: 6,
      title: 'Dento',
      description: 'Work in Progress - Currently under development',
      technologies: ['In Development'],
      images: [project4_1],
      githubLink: '#',
      isInProgress: true
    },
    {
      id: 7,
      title: 'Match Up',
      description: 'Work in Progress - Mobile application under development',
      technologies: ['React Native', 'In Development'],
      images: [project6_1],
      video: project6_video,
      githubLink: '#',
      isInProgress: true
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className={`project-card ${project.isInProgress ? 'in-progress' : ''}`} data-project-id={project.id} onClick={() => project.isInProgress ? null : openModal(project)} onMouseEnter={() => handleCardHover(project.id, project.video)}>
              <div className="project-image">
                {project.video && (showVideoForProject[project.id] !== false) ? (
                  <video key={showVideoForProject[project.id]} autoPlay muted playsInline onEnded={() => handleVideoEnd(project.id)}>
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : project.video ? (
                  <img src={project.images[0]} alt={project.title} />
                ) : project.youtubeVideo && sectionVisible ? (
                  <iframe
                    src={project.youtubeVideo}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img src={project.images[0]} alt={project.title} />
                )}
                <div className="project-overlay">
                  <div className="project-actions">
                    <button className="view-btn">
                      <i className={project.isInProgress ? "fas fa-clock" : "fas fa-eye"}></i>
                      {project.isInProgress ? "In Progress" : "View Details"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-images">
                {selectedProject.youtubeVideo && (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="450"
                      src={selectedProject.youtubeVideo.replace('mute=1', 'mute=0')}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {selectedProject.images.map((image, index) => (
                  <img key={index} src={image} alt={`${selectedProject.title} ${index + 1}`} />
                ))}
              </div>
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div className="modal-tech">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;