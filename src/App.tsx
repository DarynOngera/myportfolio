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
    'Welcome to my terminal. Type `help` for a list of commands, or `about`, `projects`, `skills`, `contact` to learn more about me.',
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
          newOutput.push('I am a Computer Science major at Strathmore University, deeply passionate about cybersecurity, distributed systems, software development, and AI/ML.');
          newOutput.push('');
          newOutput.push('Outside of academics, I\'m an avid sportsman, actively involved in rugby and hitting the gym.');
          newOutput.push('');
          newOutput.push('My defining characteristic is grit; you could say it\'s my middle name.');
          break;
        case 'projects':
          newOutput.push('Here are some of my projects:');
          newOutput.push('- Bulk bank account validator: Developed a robust bulk bank account validator capable of processing large volumes of data from JSON, XML, and XLS formats. It securely validates accounts, tokenizing and encrypting sensitive information, and delivers detailed valid/invalid reports via email in the original input formats. The system is engineered for high performance, utilizing batch and parallel processing to efficiently handle asynchronous requests.');
          newOutput.push(''); // Add an empty line for paragraph separation
          newOutput.push('- TutorMtaani: An AI-powered tutor that curates personalized learning paths based on user interests, proficiency, and preferred study modes. It provides relevant resources (articles, videos, course links) and is accessible via WhatsApp, a web application, and a command-line interface.');
          newOutput.push(''); // Add an empty line for paragraph separation
          newOutput.push('- ML-powered SOC Threat Detection Assistant: Leverages machine learning (LSTM-autoencoder) for anomaly-based detection of novel, signature-less attacks (e.g., \'low and slow\'). Integrates NLP for contextualized threat insights. (In progress)');
          break;
        case 'skills':
          newOutput.push('As a 10x vibe coder, my skills are always compiling good times!');
          newOutput.push('');
          newOutput.push('Programming Languages: Python, JavaScript, PHP, C++, Bash Scripting.');
          newOutput.push('');
          newOutput.push('Frameworks: React, Flutter, Laravel.');
          newOutput.push('');
          newOutput.push('Skills: System Administration, Cloud Platforms (AWS, Azure), Mobile Development, Web Technologies, Prompt Engineering.');
          break;
        case 'contact':
          newOutput.push('You can reach me at: ongera@example.com');
          break;
        case 'clear':
          newOutput = [...bootSequence];
          break;
        default:
          newOutput.push(`Command not found: ${input}. Type 'help' for a list of commands.`);
          break;
      }

      setOutput(newOutput);
      setInput('');
    }
  };

  useEffect(() => {
    if (!booting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [booting, output]);

  useEffect(() => {
    if (commandExecuted) {
      const terminalOutput = document.getElementById('terminal-output');
      if (terminalOutput) {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
      setCommandExecuted(false);
    }
  }, [output, commandExecuted]);

  return (
    <div className="App">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">Portfolio</div>
        </div>
        <div className="terminal-body">
          <pre id="terminal-output" className="terminal-output">
            {output.map((line, index) => (
              <span key={index} className={`output-color line-reveal ${index % 2 === 0 ? '' : 'secondary-output-color'}`}>{line}<br /></span>
            ))}
          </pre>
          {!booting && (
            <div className="terminal-input-line">
              <span className="terminal-prompt command-color">ongera@cli-portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                disabled={booting}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;