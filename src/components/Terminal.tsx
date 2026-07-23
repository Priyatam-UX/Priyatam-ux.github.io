'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import styles from './Terminal.module.css';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const commands = ['help', 'about', 'skills', 'experience', 'projects', 'contact', 'confetti', 'clear'];

export default function Terminal({ skinColor }: { skinColor: string }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on console wrapper click
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // Scroll to bottom of terminal when new commands are added
  useEffect(() => {
    if (terminalEndRef.current && history.length > 1) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history]);

  // Welcome message on mount
  useEffect(() => {
    setHistory([
      {
        command: '',
        output: (
          <div className={styles.welcomeText}>
            <p>===============================================</p>
            <p>💻 PRIYATAM INTERACTIVE CLI v3.2.0</p>
            <p>===============================================</p>
            <p>Type <strong style={{ color: 'white' }}>'help'</strong> to list available commands or click the chips below.</p>
          </div>
        ),
      },
    ]);
  }, []);

  const handleCommandRun = (cmd: string) => {
    const formattedCmd = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    if (formattedCmd === '') return;

    // Trigger screen shake on command run for dynamic interactive weight
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);

    switch (formattedCmd) {
      case 'help':
        response = (
          <div>
            <p style={{ color: 'white', marginBottom: 5 }}>Available commands:</p>
            <p>👉 <strong style={{ color: skinColor }}>about</strong> - Learn more about my background</p>
            <p>👉 <strong style={{ color: skinColor }}>skills</strong> - List my core programming languages & technologies</p>
            <p>👉 <strong style={{ color: skinColor }}>experience</strong> - Print my employment timeline</p>
            <p>👉 <strong style={{ color: skinColor }}>projects</strong> - Show my latest software engineering projects</p>
            <p>👉 <strong style={{ color: skinColor }}>contact</strong> - Print my contact details</p>
            <p>👉 <strong style={{ color: skinColor }}>confetti</strong> - Trigger celebration sparks</p>
            <p>👉 <strong style={{ color: skinColor }}>clear</strong> - Clear console output history</p>
          </div>
        );
        break;

      case 'about':
        response = (
          <div style={{ lineHeight: 1.6 }}>
            <p style={{ color: 'white', fontWeight: 600 }}>Priyatam || Software Engineer & Developer</p>
            <p style={{ color: '#d0d0d0', marginTop: 5 }}>
              I am a Software Engineer based in Bangalore. Highly skilled in frontend and backend software development, scripting integrations, 
              and crafting responsive UI elements. I enjoy challenging tasks and learning new stacks.
            </p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div>
            <p style={{ color: 'white', marginBottom: 5 }}>Technical Skills Matrix:</p>
            <p>🔹 <strong style={{ color: skinColor }}>Languages:</strong> C, C++, Java, Python, JavaScript, PHP, Kotlin</p>
            <p>🔹 <strong style={{ color: skinColor }}>Frontend:</strong> React.js, Angular, HTML5, CSS3, jQuery, AJAX</p>
            <p>🔹 <strong style={{ color: skinColor }}>Backend & DB:</strong> Node.js, Express.js, MongoDB, Spring Boot, MySQL, Laravel</p>
            <p>🔹 <strong style={{ color: skinColor }}>Integrations:</strong> ServiceNow API, REST & SOAP Web Services</p>
          </div>
        );
        break;

      case 'experience':
        response = (
          <div>
            <p style={{ color: 'white', marginBottom: 5 }}>Work History:</p>
            <div style={{ marginBottom: 10 }}>
              <p>🏢 <strong style={{ color: skinColor }}>InMorphis</strong> (May 2021 - Present)</p>
              <p style={{ color: '#c0c0c0', paddingLeft: 15 }}>• Role: Software Engineer</p>
              <p style={{ color: '#a0a0a0', paddingLeft: 15 }}>• Developed 3rd-party REST/SOAP API integrations with ServiceNow.</p>
            </div>
            <div>
              <p>🏢 <strong style={{ color: skinColor }}>Sony Research India</strong> (Nov 2020 - May 2021)</p>
              <p style={{ color: '#c0c0c0', paddingLeft: 15 }}>• Role: Full-Stack Intern</p>
              <p style={{ color: '#a0a0a0', paddingLeft: 15 }}>• Integrated deep learning models with Python and AWS environments.</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div>
            <p style={{ color: 'white', marginBottom: 5 }}>Featured Projects:</p>
            <p>🚀 <a href="https://github.com/Priyatam-UX/Wildfire-Tracker" target="_blank" rel="noopener noreferrer" style={{ color: skinColor, textDecoration: 'underline' }}>Wildfire-Tracker</a> - NASA API Maps interface</p>
            <p>🚀 <a href="https://github.com/Priyatam-UX/Real-time-pizza-tracker" target="_blank" rel="noopener noreferrer" style={{ color: skinColor, textDecoration: 'underline' }}>Pizza-Tracker</a> - Socket.io live tracking dashboard</p>
            <p>🚀 <a href="https://github.com/Priyatam-UX/fb-clone" target="_blank" rel="noopener noreferrer" style={{ color: skinColor, textDecoration: 'underline' }}>Facebook-Clone</a> - Firebase context social app</p>
            <p>🚀 <a href="https://github.com/Priyatam-UX/Face-Recognition-Attendance-System" target="_blank" rel="noopener noreferrer" style={{ color: skinColor, textDecoration: 'underline' }}>Face-Recognition-Attendance</a> - Computer vision system</p>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div>
            <p style={{ color: 'white', marginBottom: 5 }}>Connect with me:</p>
            <p>📧 Email: <a href="mailto:pritu2478@gmail.com" style={{ color: skinColor }}>pritu2478@gmail.com</a></p>
            <p>📞 Phone: <span style={{ color: 'white' }}>+91 6284079765</span></p>
            <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/priyatam-chinnari" target="_blank" rel="noopener noreferrer" style={{ color: skinColor }}>linkedin.com/in/priyatam-chinnari</a></p>
            <p>💻 GitHub: <a href="https://github.com/Priyatam-UX" target="_blank" rel="noopener noreferrer" style={{ color: skinColor }}>github.com/Priyatam-UX</a></p>
          </div>
        );
        break;

      case 'confetti':
        response = <p style={{ color: skinColor }}>🎉 Celebrations triggered!</p>;
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: [skinColor, '#ffffff', '#a855f7'],
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        response = (
          <p style={{ color: '#f43f5e' }}>
            command not found: '{formattedCmd}'. Type 'help' to see list of valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommandRun(inputValue);
    setInputValue('');
  };

  return (
    <div 
      className={`${styles.terminalWrapper} ${isShaking ? styles.shake : ''}`}
      onClick={focusInput}
    >
      {/* Header bar */}
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={`${styles.dot} styles.dotRed`} style={{ backgroundColor: '#f43f5e', width: 10, height: 10, borderRadius: '50%' }} />
          <span className={`${styles.dot} styles.dotYellow`} style={{ backgroundColor: '#eab308', width: 10, height: 10, borderRadius: '50%' }} />
          <span className={`${styles.dot} styles.dotGreen`} style={{ backgroundColor: '#10b981', width: 10, height: 10, borderRadius: '50%' }} />
        </div>
        <div className={styles.title}>visitor@priyatam-dev: ~</div>
        <div style={{ width: 40 }} /> {/* spacer */}
      </div>

      {/* Terminal body logs */}
      <div className={styles.body}>
        <div className={styles.commandHistory}>
          {history.map((item, idx) => (
            <div key={idx} className={styles.historyItem}>
              {item.command && (
                <div className={styles.inputLine}>
                  <span className={styles.prompt}>visitor@priyatam-dev:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div style={{ paddingLeft: item.command ? 15 : 0 }}>{item.output}</div>
            </div>
          ))}
        </div>
        
        {/* Active command input line */}
        <form onSubmit={handleFormSubmit} className={styles.inputLine} style={{ marginTop: 'auto' }}>
          <span className={styles.prompt}>visitor@priyatam-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.inputField}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </form>
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Chips */}
      <div className={styles.chipsContainer}>
        {commands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className={styles.chip}
            onClick={() => handleCommandRun(cmd)}
          >
            [{cmd}]
          </button>
        ))}
      </div>
    </div>
  );
}
