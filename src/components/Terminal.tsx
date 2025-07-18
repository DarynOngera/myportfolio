import React from 'react';

interface TerminalProps {
    output: (string | React.ReactElement)[];
    input: string;
    booting: boolean;
    inputRef: React.RefObject<HTMLInputElement | null>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Terminal: React.FC<TerminalProps> = ({ output, input, booting, inputRef, handleInputChange, handleInputKeyDown }) => {
    return (
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
                <div id="terminal-output" className="terminal-output">
                    {output.map((line, index) => (
                        <React.Fragment key={index}>
                            {typeof line === 'string' ? (
                                <span className={index % 2 === 0 ? 'output-color' : 'secondary-output-color'}>{line}</span>
                            ) : (
                                line
                            )}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
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
    );
}

export default Terminal;