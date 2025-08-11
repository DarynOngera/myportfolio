import React from 'react';
import { EmailIcon, GithubIcon } from './Window'; // Re-using icons from Window.tsx
import data from '../data.json';

interface ContactAppProps {
  contactData: { type: string; value: string }[];
}

const ContactApp: React.FC<ContactAppProps> = ({ contactData }) => {
  return (
    <div className="contact-app-content">
      <h2>Contact Me</h2>
      {contactData.map((item, index) => {
        if (item.type === 'email') {
          return (
            <p key={index}>
              <EmailIcon />: <a href={`mailto:${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
            </p>
          );
        } else if (item.type === 'github') {
          return (
            <p key={index}>
              <GithubIcon />: <a href={`https://github.com/${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContactApp;