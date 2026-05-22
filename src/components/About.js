import React, { useState } from "react";
import "../styles/About.css";

const About = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  React.useEffect(() => {
    // تشغيل فوري للمرة الأولى
    setShowWelcome(true);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setShowWelcome(false), 3000);

    // ثم التكرار كل 5 ثواني
    const interval = setInterval(() => {
      setShowWelcome(true);
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setShowWelcome(false), 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">About Me</h2>
        <div className="about-content">
          <div className="about-text" data-aos="fade-right" data-aos-delay="200">
            <p className="about-description">
              Computer Engineer at Damascus University with three years of
              experience in web and mobile application development. I specialize in creating
              modern, responsive web applications and mobile apps using React.js, React Native and
              cutting-edge technologies.
            </p>
            <p className="about-description">
              I'm passionate about delivering high-quality solutions and working
              with teams to automate software projects. My goal is to create
              exceptional user experiences through clean, efficient code.
            </p>
            <div className="about-stats">
              <div className="stat" data-aos="zoom-in" data-aos-delay="300">
                <h3>3+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat" data-aos="zoom-in" data-aos-delay="400">
                <h3>4+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat" data-aos="zoom-in" data-aos-delay="500">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="code-snippet" data-aos="fade-left" data-aos-delay="200">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="code-content">
              <div className="code-line">
                <span className="keyword">const</span>
                <span className="variable"> developer</span>
                <span className="operator"> = </span>
                <span className="string">"Ahmad Yousef"</span>
                <span className="operator">;</span>
              </div>
              <div className="code-line">
                <span className="keyword">const</span>
                <span className="variable"> skills</span>
                <span className="operator"> = </span>
                <span className="bracket">[</span>
              </div>
              <div className="code-line indent">
                <span className="string">"React.js"</span>
                <span className="comma">,</span>
              </div>
              <div className="code-line indent">
                <span className="string">"JavaScript"</span>
              </div>
              <div className="code-line">
                <span className="bracket">]</span>
                <span className="operator">;</span>
              </div>
              <div className="code-line cursor-line">
                {!showWelcome && <span className="blinking-cursor"></span>}
                {showWelcome && (
                  <span key={animationKey} className="typing-animation">
                    <span className="keyword">console</span>
                    <span className="operator">.</span>
                    <span className="keyword">log</span>
                    <span className="bracket">(</span>
                    <span className="string">"Welcome to my website!"</span>
                    <span className="bracket">)</span>
                    <span className="operator">;</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
