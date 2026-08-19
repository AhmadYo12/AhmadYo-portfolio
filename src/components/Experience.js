import React from 'react';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Front-end Developer',
      company: 'MKAYO Team',
      period: '2023 - Present',
      description: 'Working as a front-end developer specializing in React.js development and modern web technologies.',
      icon: 'fas fa-briefcase',
      current: true
    },
    {
      title: 'Front-End & Mobile App Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Working on front-end web projects and mobile application development using React.js and React Native.',
      icon: 'fas fa-laptop-code',
      current: true
    },
    {
      title: 'Project Manager & Software Engineer',
      company: 'Match Up & Dento',
      period: '2025 - Present',
      description: 'Leading the development and management of Match Up and Dento projects. Responsible for software architecture, team coordination, sprint planning, and ensuring delivery of high-quality software solutions.',
      icon: 'fas fa-project-diagram',
      current: true
    }
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Work Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`timeline-item ${exp.current ? 'current' : ''}`} 
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} 
              data-aos-delay={index * 200}
            >
              <div className="timeline-marker">
                <div className="timeline-icon">
                  <i className={exp.icon}></i>
                </div>
              </div>
              <div className="timeline-content">
                <div className="experience-card">
                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <h4 className="experience-company">{exp.company}</h4>
                  <p className="experience-description">{exp.description}</p>
                  {exp.current && (
                    <div className="current-badge">
                      <i className="fas fa-circle"></i>
                      Currently Working
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;