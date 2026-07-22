'use client';

import { motion } from 'framer-motion';
import { Laptop, Palette, Smartphone, Gamepad2, Monitor, Server } from 'lucide-react';
import TiltCard from './TiltCard';
import styles from './Services.module.css';

const services = [
  {
    icon: Laptop,
    title: 'Web Development',
    desc: 'Web development is the work involved in developing websites and web portals for the internet or private intranets, ensuring high performance and robustness.',
  },
  {
    icon: Palette,
    title: 'Web Design',
    desc: 'Creating visual design systems, layout wireframes, high-fidelity UI mockups, user-centered flows, and helping with updates and ongoing design maintenance.',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    desc: 'Engineering user-oriented mobile applications across popular platforms, designed to elevate digital product profiles and build immersive user experiences.',
  },
  {
    icon: Gamepad2,
    title: '2D & 3D Game Dev',
    desc: 'Building interactive and powerful game systems using engines like Unity, targeting multiple deployment targets (desktop, web, mobile, and console).',
  },
  {
    icon: Monitor,
    title: 'Front-end Development',
    desc: 'Converting UX wireframes and designs into pixel-perfect, highly responsive interfaces using JavaScript, React.js, Angular, HTML5, CSS3, and AJAX.',
  },
  {
    icon: Server,
    title: 'Back-end Development',
    desc: 'Building secure server-side logic, architecting relational/non-relational database structures, managing server requests, and crafting robust APIs.',
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 120 },
    },
  } as const;

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.servicesGrid}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <TiltCard className={styles.serviceCard}>
                  <div className={styles.iconContainer}>
                    <Icon className={styles.icon} />
                  </div>
                  <h4 className={styles.cardTitle}>{service.title}</h4>
                  <p className={styles.cardDesc}>{service.desc}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
