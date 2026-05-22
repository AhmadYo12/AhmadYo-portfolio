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
import project6_2 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٣_٠٠_٧٣١_com_AYO1_matchup.jpg';
import project6_3 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٣_١٠_٩٦٢_com_AYO1_matchup.jpg';
import project6_4 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٣_٢٩_١٤١_com_AYO1_matchup.jpg';
import project6_5 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٣_٣٨_١٢١_com_AYO1_matchup.jpg';
import project6_6 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٣_٥٤_٤٦٨_com_AYO1_matchup.jpg';
import project6_7 from '../assets/project 6/Screenshot_٢٠٢٦_٠٥_٢٢_١٦_٣٥_٣١_٠٢١_com_AYO1_matchup.jpg';

import project7_1 from '../assets/project 7/1.jpg';
import project7_2 from '../assets/project 7/2.jpg';
import project7_3 from '../assets/project 7/3.jpg';

import project8_1 from '../assets/project 8/1.jpg';

import ferAI_1 from '../assets/FER_AI/1.png';
import ferAI_2 from '../assets/FER_AI/2.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showVideoForProject, setShowVideoForProject] = useState({});
  const [sectionVisible, setSectionVisible] = useState(false);
  const [ferAIImageIndex, setFerAIImageIndex] = useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            const projectId = entry.target.getAttribute('data-project-id');
            if (projectId === '7') {
              setShowVideoForProject(prev => ({ ...prev, [projectId]: true }));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('#projects');
    if (section) observer.observe(section);

    const matchupCard = document.querySelector('[data-project-id="7"]');
    if (matchupCard) observer.observe(matchupCard);

    return () => {
      if (section) observer.unobserve(section);
      if (matchupCard) observer.unobserve(matchupCard);
    };
  }, []);

  // FER_AI image rotation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFerAIImageIndex(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoEnd = (projectId) => {
    setShowVideoForProject(prev => ({ ...prev, [projectId]: false }));
  };

  const handleCardHover = (projectId, hasVideo) => {
    if (hasVideo && projectId === 7) {
      setShowVideoForProject(prev => ({ ...prev, [projectId]: true }));
    }
  };

  const handleCardLeave = (projectId, hasVideo) => {
    // لا نوقف الفيديو عند إزالة الماوس، نتركه يكمل
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
      githubLink: 'https://github.com/AhmadYo12/Working-Hours',
      liveLink: 'https://working-hours-basirah.netlify.app/'
    },
    {
      id: 5,
      title: 'Smart University Entry System',
      description: 'Intelligent access control system for university campuses with real-time monitoring and automated student authentication.',
      technologies: ['React.js', 'Arduino Uno', 'ESP32', 'ThingSpeak', 'IoT'],
      images: [project5_0, project5_2, project5_1, project5_3],
      githubLink: 'https://github.com/AhmadYo12/Smart-University-Entry-System',
      youtubeVideo: 'https://www.youtube.com/embed/Gk-LU5aM744?autoplay=1&mute=1',
      youtubeThumbnail: 'https://img.youtube.com/vi/Gk-LU5aM744/maxresdefault.jpg'
    },
    {
      id: 6,
      title: 'Basirah',
      description: 'Islamic studies academy with educational programs in Islamic sciences and modern learning system.',
      technologies: ['Vue.js', 'Laravel'],
      images: [project8_1],
      liveLink: 'https://www.basirahonline.com/',
      youtubeVideo: 'https://www.youtube.com/embed/jl17UgOofqo?autoplay=1&mute=1',
      youtubeThumbnail: 'https://img.youtube.com/vi/jl17UgOofqo/maxresdefault.jpg'
    },
    {
      id: 7,
      title: 'Match Up',
      description: 'Mobile app for booking sports fields in Syria including football, basketball, tennis, padel, volleyball and handball.',
      technologies: ['React Native', 'Laravel'],
      images: [project6_1, project6_2, project6_3, project6_4, project6_5, project6_6, project6_7],
      video: project6_video,
      liveLink: 'https://matchup.sy',
      isMobileApp: true
    },
    {
      id: 8,
      title: 'FER_AI',
      description: 'Facial Expression Recognition system using Artificial Intelligence for emotion detection and analysis.',
      technologies: ['Python', 'AI/ML', 'Computer Vision'],
      images: [ferAI_1, ferAI_2],
      hasImageRotation: true,
      githubLink: 'https://github.com/AhmadYo12/FER_AI.git'
    },
    {
      id: 9,
      title: 'Dento',
      description: 'Work in Progress - Currently under development',
      technologies: ['In Development'],
      images: [project4_1],
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
        <h2 className="section-title" data-aos="fade-up">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card ${project.isInProgress ? 'in-progress' : ''}`} data-project-id={project.id} onClick={() => project.isInProgress ? null : openModal(project)} onMouseEnter={() => handleCardHover(project.id, project.video)} onMouseLeave={() => handleCardLeave(project.id, project.video)} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="project-image">
                {project.video && (showVideoForProject[project.id]) ? (
                  <video autoPlay muted playsInline onEnded={() => handleVideoEnd(project.id)}>
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : project.video ? (
                  <img src={project.images[0]} alt={project.title} />
                ) : project.hasImageRotation ? (
                  <div className="image-slider">
                    {project.images.map((img, imgIndex) => (
                      <img 
                        key={imgIndex} 
                        src={img} 
                        alt={`${project.title} ${imgIndex + 1}`}
                        className={imgIndex === ferAIImageIndex ? 'active' : ''}
                      />
                    ))}
                  </div>
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
                    {project.liveLink ? (
                      <>
                        <button className="view-btn" onClick={(e) => { e.stopPropagation(); openModal(project); }}>
                          <i className="fas fa-eye"></i>
                          View Details
                        </button>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="view-btn live-btn" onClick={(e) => e.stopPropagation()}>
                          <i className="fas fa-external-link-alt"></i>
                          Visit Site
                        </a>
                      </>
                    ) : (
                      <button className="view-btn">
                        <i className={project.isInProgress ? "fas fa-clock" : "fas fa-eye"}></i>
                        {project.isInProgress ? "In Progress" : "View Details"}
                      </button>
                    )}
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
                {selectedProject.isMobileApp && selectedProject.images.length > 0 && (
                  <>
                    <img src={selectedProject.images[0]} alt={`${selectedProject.title} logo`} style={{width: '100%', borderRadius: '10px', border: '1px solid var(--border-color)'}} />
                    <div className="mobile-screenshots">
                      {selectedProject.images.slice(1).map((image, index) => (
                        <img key={index + 1} src={image} alt={`${selectedProject.title} ${index + 2}`} />
                      ))}
                    </div>
                  </>
                )}
                {!selectedProject.isMobileApp && selectedProject.images.map((image, index) => (
                  <img key={index} src={image} alt={`${selectedProject.title} ${index + 1}`} />
                ))}
              </div>
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                  <div className="modal-tech">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                    {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="view-btn github-btn">
                        <i className="fab fa-github"></i>
                        GitHub
                      </a>
                    )}
                    {selectedProject.liveLink && (
                      <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="view-btn live-btn">
                        <i className="fas fa-external-link-alt"></i>
                        Visit Site
                      </a>
                    )}
                  </div>
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