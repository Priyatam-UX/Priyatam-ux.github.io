'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Mail, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';

function LinkedinIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import TiltCard from './TiltCard';
import styles from './Contact.module.css';

const contactInfo = [
  { icon: Phone, label: 'Call Us On', value: '+91 6284079765', href: 'tel:+916284079765' },
  { icon: MapPin, label: 'Location', value: 'Bangalore, India', href: null },
  { icon: Mail, label: 'Email', value: 'pritu2478@gmail.com', href: 'mailto:pritu2478@gmail.com' },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'priyatam-chinnari',
    href: 'https://www.linkedin.com/in/priyatam-chinnari',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ Name: '', email: '', Subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('https://formcarry.com/s/ZLH1WddiPy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        setStatus('success');
        setFormData({ Name: '', email: '', Subject: '', message: '' });
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [
            getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim(),
            '#ffffff',
            '#2196f3',
          ],
        });
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'There was an issue sending your message. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

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
      transition: { type: 'spring', damping: 22, stiffness: 120 },
    },
  } as const;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <h2>Contact Me</h2>
      </div>

      <div className="hud-scrollable">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={styles.contactContent}
        >
          <div className={styles.introHeaders}>
            <h3 className={styles.contactTitle}>Have You Any Questions?</h3>
            <h4 className={styles.contactSubTitle}>I'm At Your Service</h4>
          </div>

          {/* Info cards row */}
          <div className={styles.infoGrid}>
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              const cardContent = (
                <div className={styles.infoCardInner}>
                  <div className={styles.iconWrapper}>
                    <Icon className={styles.infoIcon} />
                  </div>
                  <h4>{info.label}</h4>
                  <p>{info.value}</p>
                </div>
              );

              return (
                <motion.div key={idx} variants={itemVariants}>
                  {info.href ? (
                    <a href={info.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                      <TiltCard className={styles.infoCard}>{cardContent}</TiltCard>
                    </a>
                  ) : (
                    <TiltCard className={styles.infoCard}>{cardContent}</TiltCard>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>Interested in working together? Fill out the form</h3>
            <h4 className={styles.formSubTitle}>Get In Touch</h4>

            {/* Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className={styles.formControl}
                  />
                  <span className={styles.inputFocusLine} />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={styles.formControl}
                  />
                  <span className={styles.inputFocusLine} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={styles.formControl}
                />
                <span className={styles.inputFocusLine} />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message..."
                  rows={6}
                  required
                  className={styles.formControl}
                />
                <span className={styles.inputFocusLine} />
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`${styles.submitBtn} btn`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Success / Error Modals */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={() => setStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`${styles.modalCard} glass`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setStatus('idle')} aria-label="Close modal">
                <X size={20} />
              </button>
              <CheckCircle2 className={styles.modalIconSuccess} />
              <h3>Message Sent!</h3>
              <p>Thank you for getting in touch. I will read your message and reply back to you as soon as possible.</p>
              <button className="btn" onClick={() => setStatus('idle')} style={{ width: '100%', marginTop: 20 }}>
                Done
              </button>
            </motion.div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={() => setStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`${styles.modalCard} glass`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setStatus('idle')} aria-label="Close modal">
                <X size={20} />
              </button>
              <AlertCircle className={styles.modalIconError} />
              <h3>Failed to Send</h3>
              <p>{errorMsg}</p>
              <button className="btn" onClick={() => setStatus('idle')} style={{ width: '100%', marginTop: 20 }}>
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
