import jsPDF from 'jspdf';

export const generateCV = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header - Name
  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(26);
  doc.setFont(undefined, 'bold');
  doc.text('AHMAD YOUSEF', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Front-end Developer', pageWidth / 2, 22, { align: 'center' });

  y = 35;
  doc.setTextColor(0, 0, 0);

  // Contact Info
  doc.setFontSize(9);
  const contact = 'ahmadyo8643@gmail.com | GitHub: AhmadYo12 | LinkedIn: ahmad-yousef-65243538a';
  doc.text(contact, pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Professional Summary
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('PROFESSIONAL SUMMARY', 15, y);
  y += 6;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  const summary = doc.splitTextToSize(
    'Computer Engineer at Damascus University with two years of experience in website programming. Specializing in creating modern, responsive web applications using React.js and cutting-edge technologies. Passionate about delivering high-quality solutions and working with teams to automate software projects.',
    170
  );
  doc.text(summary, 15, y);
  y += summary.length * 4 + 8;

  // Work Experience
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('WORK EXPERIENCE', 15, y);
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 8;

  // Job 1
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Front-end Developer', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('MKAYO Team | 2023 - Present', 15, y + 5);
  y += 10;
  doc.setFontSize(9);
  const job1Desc = doc.splitTextToSize(
    'Working as a front-end developer specializing in React.js development and modern web technologies.',
    170
  );
  doc.text(job1Desc, 15, y);
  y += job1Desc.length * 4 + 6;

  // Job 2
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Front-End & Mobile App Developer', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('Freelance | Present', 15, y + 5);
  y += 10;
  doc.setFontSize(9);
  const job2Desc = doc.splitTextToSize(
    'Working on front-end web projects and mobile application development.',
    170
  );
  doc.text(job2Desc, 15, y);
  y += job2Desc.length * 4 + 8;

  // Technical Skills
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('TECHNICAL SKILLS', 15, y);
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Programming Languages:', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('JavaScript, TypeScript, Java, C++, C', 15, y + 4);
  y += 11;

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Frameworks & Libraries:', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  const frameworks = doc.splitTextToSize(
    'React.js, React Native, React Router, Tailwind CSS, Redux, Context API, Axios',
    170
  );
  doc.text(frameworks, 15, y + 4);
  y += frameworks.length * 4 + 7;

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Tools & Technologies:', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('VS Code, Git, GitHub, GitLab, Firebase, Arduino, ESP32, IoT', 15, y + 4);
  y += 11;

  // Key Projects
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('KEY PROJECTS', 15, y);
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 8;

  // Project 1
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Smart University Entry System', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  const proj1 = doc.splitTextToSize(
    'Intelligent access control system with real-time monitoring and automated student authentication using React.js, Arduino Uno, ESP32, and ThingSpeak.',
    170
  );
  doc.text(proj1, 15, y + 4);
  y += proj1.length * 4 + 7;

  // Project 2
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Working Hours Management System', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  const proj2 = doc.splitTextToSize(
    'Employee attendance system with real-time tracking, shift scheduling, and comprehensive reporting dashboard using React.js and Firebase.',
    170
  );
  doc.text(proj2, 15, y + 4);
  y += proj2.length * 4 + 7;

  // Project 3
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('E-Commerce Platform', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  const proj3 = doc.splitTextToSize(
    'Modern e-commerce website with shopping cart, product catalog, and user authentication built with React.js.',
    170
  );
  doc.text(proj3, 15, y + 4);
  y += proj3.length * 4 + 8;

  // Education
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('EDUCATION', 15, y);
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Computer Engineering', 15, y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('Damascus University', 15, y + 4);

  // Save
  doc.save('Ahmad_Yousef_CV.pdf');
};
