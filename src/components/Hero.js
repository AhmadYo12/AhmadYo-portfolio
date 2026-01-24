import React from 'react';
import '../styles/Hero.css';
import myPhoto from '../assets/me.jpg';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Ahmad Yousef</span>
            </h1>
            <p className="hero-subtitle">
              Front-end developer with a full team to automate software projects
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
            <div className="social-links">
              <a href="mailto:ahmadyo8643@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://github.com/AhmadYo12" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/ahmad-yousef-65243538a" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={myPhoto} alt="Ahmad Yousef" />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
    </section>
  );
};

export default Hero;