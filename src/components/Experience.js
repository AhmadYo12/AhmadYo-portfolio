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
      title: 'Freelance Developer',
      company: 'Self-Employed',
      period: 'Present',
      description: 'Providing freelance programming services and developing custom web solutions for various clients.',
      icon: 'fas fa-laptop-code',
      current: true
    }
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${exp.current ? 'current' : ''}`}>
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