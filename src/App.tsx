import React, { useState, useEffect, useRef, useMemo } from 'react';
import './index.css';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [booting, setBooting] = useState(true);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootSequence = useMemo(() => [
    'Booting up...',
    'Connecting to secure server...',
    'Connection established.',
    'Welcome to my terminal. Type `help` for a list of commands.',
  ], []);

  const bootedRef = useRef(false);

  useEffect(() => {
    if (booting && !bootedRef.current) {
      bootedRef.current = true;
      const boot = async () => {
        for (let i = 0; i < bootSequence.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setOutput((prevOutput) => [...prevOutput, bootSequence[i]]);
        }
        setBooting(false);
      };
      boot();
    }
  }, [booting, bootSequence]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !booting) {
      setCommandExecuted(true);
      let newOutput = [...output, `> ${input}`];

      switch (input.toLowerCase()) {
        case 'help':
          newOutput.push('Available commands: help, about, projects, skills, contact, clear');
          break;
        case 'about':
          newOutput.push('I am a Computer Science major at Strathmore University, deeply passionate about cybersecurity, distributed systems, software development, and AI/ML. Outside of academics, I\'m an avid sportsman, actively involved in rugby and hitting the gym. My defining characteristic is grit; you could say it\'s my middle name.');
          break;
        case 'projects':
          newOutput.push('Here are some of my projects:');
          newOutput.push('- Bulk bank account validator: Developed a robust bulk bank account validator capable of processing large volumes of data from JSON, XML, and XLS formats. It securely validates accounts, tokenizing and encrypting sensitive information, and delivers detailed valid/invalid reports via email in the original input formats. The system is engineered for high performance, utilizing batch and parallel processing to efficiently handle asynchronous requests.');
          break;
        case 'tutorMtaani':
          newOutput.push('TutorMtaani: An AI-powered tutor that curates personalized learning paths based on user interests, proficiency, and preferred study modes. It provides relevant resources (articles, videos, course links) and is accessible via WhatsApp, a web application, and a command-line interface.');
          break;
        case 'skills':
          newOutput.push('As a 10x vibe coder, my skills are always compiling good times!');
          newOutput.push('Programming Languages: Python, JavaScript, PHP, C++, Bash Scripting.');
          newOutput.push('Frameworks: React, Flutter, Laravel.');
          newOutput.push('Skills: System Administration, Cloud Platforms (AWS, Azure), Mobile Development, Web Technologies, Prompt Engineering.');
          break;
        case 'contact':
          newOutput.push('You can contact me through:');
          newOutput.push('📧 Email: ongeradaryn@gmail.com');
          newOutput.push('🐙 GitHub: [DarynOngera](https://github.com/DarynOngera)');
          break;
        case 'clear':
          newOutput = [...bootSequence];
          break;
        default:
          newOutput.push(`Command not found: ${input}`);
          break;
      }

      setOutput(newOutput);
      setInput('');
      setTimeout(() => setCommandExecuted(false), 300); // Reset after animation
    }
  };

  useEffect(() => {
    if (!booting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [booting]);

  return (
    <div className="container">
      <div className="output">
        {output.map((line, index) => (
          <div
            key={index}
            className={`line-reveal ${commandExecuted ? 'command-executed' : ''} ${line.startsWith('>') ? 'command-color' : 'output-color'}
              ${line.startsWith('Command not found') ? 'error-color' : ''}
            `}
          >
            <span>{line}</span>
          </div>
        ))}
      </div>
      {!booting && (
        <div className="input-line">
          <span>&gt;</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
            autoFocus
          />
          <span className="cursor"></span>
        </div>
      )}
    </div>
  );
};


export default App;
