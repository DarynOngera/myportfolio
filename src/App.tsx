import React, { useState, useEffect, useRef, useMemo, JSX } from 'react';
import './index.css';
import AsteroidsGame from './AsteroidsGame';
import Terminal from './components/Terminal';
import data from './data.json';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [booting, setBooting] = useState(true);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [gameActive, setGameActive] = useState(false);
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

  const handleGameExit = () => {
    setGameActive(false);
    setOutput(prevOutput => [...prevOutput, 'Exited Asteroids.']);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !booting) {
      setCommandExecuted(true);
      let newOutput = [...output, `> ${input}`];

      switch (input.trim().toLowerCase()) {
        case 'help':
          newOutput.push('Available commands: help, about, projects, skills, contact, clear, asteroids');
          break;
        case 'about':
          newOutput.push(...data.about);
          break;
        case 'projects':
          newOutput.push(...data.projects);
          break;
        case 'skills':
          newOutput.push(...data.skills);
          break;
        case 'contact':
            data.contact.forEach(item => {
                if (item.type === 'email') {
                    newOutput.push(
                        <>
                          You can reach me at: <img src="https://www.google.com/s2/favicons?domain=gmail.com" className="favicon" alt="Gmail icon" /> <a href={`mailto:${item.value}`} target="_blank" rel="noopener noreferrer" className="contact-link">{item.value}</a>
                        </>
                    );
                } else if (item.type === 'github') {
                    newOutput.push(
                        <>
                          My GitHub: <img src="https://github.com/favicon.ico" className="favicon" alt="GitHub icon" /> <a href={`https://github.com/${item.value}`} target="_blank" rel="noopener noreferrer" className="contact-link">{item.value}</a>
                        </>
                    );
                }
            });
          break;
        case 'clear':
          newOutput = [...bootSequence];
          break;
        case 'asteroids':
          setGameActive(true);
          newOutput.push('Starting Asteroids...');
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

  if (gameActive) {
    return <AsteroidsGame onExit={handleGameExit} />;
  }

  return (
    <div className="App">
        <Terminal 
            output={output} 
            input={input} 
            booting={booting} 
            inputRef={inputRef} 
            handleInputChange={handleInputChange} 
            handleInputKeyDown={handleInputKeyDown} 
        />
    </div>
  );
};

export default App;
