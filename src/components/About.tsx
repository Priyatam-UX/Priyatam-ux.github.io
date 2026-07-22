'use client';

import { motion } from 'framer-motion';
import { Calendar, Mail, GraduationCap, Phone, MapPin, Briefcase, Award, Code, ChevronRight } from 'lucide-react';
import TiltCard from './TiltCard';
import styles from './About.module.css';

const personalInfo = [
  { icon: Calendar, label: 'Birthday', value: '08 Dec 1999' },
  { icon: Award, label: 'Age', value: `${new Date().getFullYear() - 1999}` },
  { icon: GraduationCap, label: 'Degree', value: 'B.Tech CSE Hons' },
  { icon: Briefcase, label: 'Freelance', value: 'Available' },
  { icon: Phone, label: 'Phone', value: '+91 6284079765' },
  { icon: Mail, label: 'Email', value: 'pritu2478@gmail.com' },
  { icon: MapPin, label: 'City', value: 'Bangalore, India' },
  { icon: Code, label: 'Github', value: 'github.com/Priyatam-UX' },
];

const skills = [
  { name: 'C / C++ / Java / Python / DSA', level: 90 },
  { name: 'HTML5 / CSS3 / JavaScript / React / Angular', level: 95 },
  { name: 'Node.js / Express / MongoDB / PHP / SQL', level: 85 },
  { name: 'ServiceNow Scripting / Integrations / REST API', level: 88 },
];

const techTags = [
  'C', 'C++', 'Java', 'Python', 'Data Structures & Algorithms', 'HTML5', 'CSS3', 
  'JavaScript', 'Bootstrap', 'React.js', 'Angular.js', 'jQuery', 'Node.js', 
  'Express.js', 'MongoDB', 'Laravel', 'PHP', 'MySql', 'Linux', 'Git', 
  'Machine Learning', 'Kotlin', 'Spring Boot', 'ServiceNow', 'REST API', 'SOAP'
];

const education = [
  {
    date: '2017 - 2021',
    title: "Bachelor's in Computer Science",
    institution: 'Lovely Professional University',
    score: 'Cum GPA: 8.4/10',
    desc: 'Strongly focused on Full-Stack Development and core software engineering principles.',
  },
  {
    date: '2015 - 2017',
    title: 'XII - BIEAP Board',
    institution: 'Sri Chaitanya Junior College',
    score: 'Cum GPA: 9.1/10',
    desc: 'Pre-University College education specializing in Mathematics, Physics, and Chemistry.',
  },
  {
    date: '2013 - 2015',
    title: 'X - SSC Board',
    institution: 'Sri Chaitanya Techno School',
    score: 'Cum GPA: 8.7/10',
    desc: 'Secondary School Certification focusing on fundamental science and mathematics.',
  },
];

const experience = [
  {
    date: 'May 2021 - Present',
    title: 'Software Engineer',
    company: 'InMorphis',
    desc: 'Developing integrations with 3rd party tools and ServiceNow using scripted & OOB RestAPI/SOAP Web services. Customize business processes through Business Rules, Client Scripts, ACLs, UI Policies, Portal, and UI Pages. Working with HTML5, JavaScript, CSS, Angular, and AJAX for responsive design.',
  },
  {
    date: 'Nov 2020 - May 2021',
    title: 'Full-Stack Intern',
    company: 'Sony Research India',
    desc: 'Wrote clean, functional code on the front- and back-end. Integrated and deployed machine learning models with a Python backend on AWS. Implemented and evaluated DL algorithms on Sony’s Neural Network Libraries framework.',
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 },
    },
  } as const;

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.aboutContent}
        >
          {/* Intro Section */}
          <motion.div variants={itemVariants} className={styles.introBlock}>
            <h3>I'm Priyatam && <span className={styles.highlight}>a Developer</span></h3>
            <p className={styles.bio}>
              Highly skilled in designing, testing, and developing software with a thorough understanding of data structures and algorithms. 
              Knowledgeable of backend and frontend development best practices, with hands-on software troubleshooting experience. 
              I enjoy challenging tasks and look forward to interesting, innovative projects that require me to learn new languages and development techniques.
            </p>
          </motion.div>

          {/* Details & Skills Split */}
          <div className={styles.detailsGrid}>
            {/* Left Column: Personal Info Cards */}
            <motion.div variants={itemVariants} className={styles.infoColumn}>
              <div className={styles.infoCardsGrid}>
                {personalInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className={`${styles.infoCard} glass`}>
                      <Icon className={styles.infoIcon} />
                      <div>
                        <span className={styles.infoLabel}>{info.label}</span>
                        <p className={styles.infoValue}>{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Skill Meters */}
            <motion.div variants={itemVariants} className={styles.skillsColumn}>
              <div className={styles.skillsList}>
                {skills.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <div className={styles.skillMeta}>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className={styles.progressFill}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Cloud */}
          <motion.div variants={itemVariants} className={styles.techCloudBlock}>
            <h4>Tech Stack / Skills</h4>
            <div className={styles.tagsContainer}>
              {techTags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Timelines: Ed & Exp */}
          <div className={styles.timelinesGrid}>
            {/* Experience timeline */}
            <motion.div variants={itemVariants} className={styles.timelineBlock}>
              <h3 className={styles.timelineMainTitle}>Work Experience</h3>
              <div className={styles.timelineTrack}>
                {experience.map((exp, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <TiltCard className={styles.timelineCard}>
                      <span className={styles.timelineDate}>{exp.date}</span>
                      <h4 className={styles.timelineTitle}>{exp.title}</h4>
                      <h5 className={styles.timelineSubtitle}>{exp.company}</h5>
                      <p className={styles.timelineText}>{exp.desc}</p>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education timeline */}
            <motion.div variants={itemVariants} className={styles.timelineBlock}>
              <h3 className={styles.timelineMainTitle}>Education</h3>
              <div className={styles.timelineTrack}>
                {education.map((edu, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <TiltCard className={styles.timelineCard}>
                      <span className={styles.timelineDate}>{edu.date}</span>
                      <h4 className={styles.timelineTitle}>{edu.title}</h4>
                      <h5 className={styles.timelineSubtitle}>{edu.institution}</h5>
                      <span className={styles.timelineScore}>{edu.score}</span>
                      <p className={styles.timelineText}>{edu.desc}</p>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
