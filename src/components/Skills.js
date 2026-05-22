import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const programmingLanguages = [
    { name: 'JavaScript', level: 90, icon: 'fab fa-js-square' },
    { name: 'TypeScript', level: 70, icon: 'fab fa-js-square typescript-icon' },
    { name: 'Java', level: 80, icon: 'fab fa-java' },
    { name: 'C++', level: 75, icon: 'fas fa-code' },
    { name: 'C', level: 70, icon: 'fas fa-code' }
  ];

  const frameworks = [
    { name: 'React.js', level: 95, icon: 'fab fa-react' },
    { name: 'React Native', level: 70, icon: 'fab fa-react' },
    { name: 'React Router', level: 90, icon: 'fab fa-react' },
    { name: 'Tailwind CSS', level: 85, icon: 'fab fa-css3-alt' },
    { name: 'Context API', level: 80, icon: 'fab fa-react' },
    { name: 'Redux', level: 75, icon: 'fas fa-layer-group' },
    { name: 'Axios', level: 85, icon: 'fas fa-exchange-alt' }
  ];

  const tools = [
    { name: 'VS Code', level: 95, icon: 'fas fa-code' },
    { name: 'Git', level: 85, icon: 'fab fa-git-alt' },
    { name: 'GitHub', level: 90, icon: 'fab fa-github' },
    { name: 'GitLab', level: 85, icon: 'fab fa-gitlab' }
  ];

  const SkillCard = ({ skills, title, delay = 0 }) => (
    <div className="skill-category" data-aos="fade-up" data-aos-delay={delay} data-aos-duration="600">
      <h3 className="category-title">{title}</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item" data-aos="zoom-in" data-aos-delay={delay + (index * 70)} data-aos-duration="600">
            <div className="skill-header">
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <div className="skill-info">
                <h4>{skill.name}</h4>
                <span>{skill.level}%</span>
              </div>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Skills & Technologies</h2>
        <div className="skills-content">
          <SkillCard skills={programmingLanguages} title="Programming Languages" delay={100} />
          <SkillCard skills={frameworks} title="Frameworks & Libraries" delay={200} />
          <SkillCard skills={tools} title="Tools & Technologies" delay={300} />
        </div>
      </div>
    </section>
  );
};

export default Skills;