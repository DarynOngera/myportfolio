import React, { useState, useEffect, useRef, useMemo, JSX } from 'react';
import './index.css';
import AsteroidsGame from './AsteroidsGame';
import Terminal from './components/Terminal';
import data from './data.json';

const CliApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const welcomeMessage = useMemo(() => [
    <span className="info-text">Welcome to my terminal. Type <span className="highlight">`help`</span> for a list of commands, or <span className="highlight">`about`</span>, <span className="highlight">`projects`</span>, <span className="highlight">`skills`</span>, <span className="highlight">`contact`</span> to learn more about me.</span>,
  ], []);

  useEffect(() => {
    setOutput(welcomeMessage);
  }, [welcomeMessage]);

  const handleGameExit = () => {
    setGameActive(false);
    setOutput(prevOutput => [...prevOutput, <span className="success-text">Exited Asteroids.</span>]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCommandExecuted(true);
      let newOutput = [...output, <span className="command-color">&gt; {input}</span>];

      switch (input.trim().toLowerCase()) {
        case 'help':
          newOutput.push(<span className="info-text">Available commands: <span className="highlight">help</span>, <span className="highlight">about</span>, <span className="highlight">projects</span>, <span className="highlight">skills</span>, <span className="highlight">contact</span>, <span className="highlight">clear</span>, <span className="highlight">asteroids</span></span>);
          break;
        case 'about':
          data.about.forEach((paragraph, index) => {
            newOutput.push(<span key={index} className="info-text">{paragraph}</span>);
          });
          break;
        case 'projects':
          newOutput.push(<span className="bold-text">My Projects:</span>);
          data.projects.forEach((project, index) => {
            newOutput.push(<span key={index} className="secondary-output-color bold-text">{project.name}:</span>);
            newOutput.push(<span className="info-text">{project.description}</span>);
            newOutput.push(<span className="info-text">Link: <a href={project.link} target="_blank" rel="noopener noreferrer" className="highlight">{project.link}</a></span>);
            newOutput.push("");
          });
          break;
        case 'skills':
          newOutput.push(<span className="bold-text">My Skills:</span>);
          data.skills.forEach((category, index) => {
            newOutput.push(<span key={index} className="secondary-output-color bold-text">{category.category}:</span>);
            category.items.forEach((skill, skillIndex) => {
              newOutput.push(<span key={`${index}-${skillIndex}`} className="info-text">  - {skill}</span>);
            });
            newOutput.push("");
          });
          break;
        case 'contact':
            newOutput.push(<span className="bold-text">Contact Information:</span>);
            data.contact.forEach(item => {
                if (item.type === 'email') {
                    newOutput.push(
                        <span className="info-text">
                          You can reach me at: <img src="https://www.google.com/s2/favicons?domain=gmail.com" className="favicon" alt="Gmail icon" /> <a href={`mailto:${item.value}`} target="_blank" rel="noopener noreferrer" className="highlight contact-link">{item.value}</a>
                        </span>
                    );
                } else if (item.type === 'github') {
                    newOutput.push(
                        <span className="info-text">
                          My GitHub: <img src="https://github.com/favicon.ico" className="favicon" alt="GitHub icon" /> <a href={`https://github.com/${item.value}`} target="_blank" rel="noopener noreferrer" className="highlight contact-link">{item.value}</a>
                        </span>
                    );
                }
            });
          break;
        case 'clear':
          newOutput = [...welcomeMessage];
          break;
        case 'asteroids':
          setGameActive(true);
          newOutput.push(<span className="success-text">Starting Asteroids...</span>);
          break;
        default:
          newOutput.push(<span className="error-color">Command not found: {input}. Type <span className="highlight">`help`</span> for a list of commands.</span>);
          break;
      }

      setOutput(newOutput);
      setInput('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [output]);

  useEffect(() => {
    if (commandExecuted) {
      const terminalOutput = document.getElementById('terminal-output');
      if (terminalOutput) {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
      setCommandExecuted(false);
    }
  }, [output, commandExecuted]);

  if (gameActive) {
    return <AsteroidsGame onExit={handleGameExit} />;
  }

  return (
    <div className="App">
        <Terminal 
            output={output} 
            input={input} 
            inputRef={inputRef} 
            handleInputChange={handleInputChange} 
            handleInputKeyDown={handleInputKeyDown} 
        />
    </div>
  );
};

export default CliApp;