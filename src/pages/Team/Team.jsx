import React, { useEffect, useState } from 'react';
import './Team.css';
import { teamMembers } from '../../utils/utils1';

const TeamSection = ({ title, members, animationClass }) => (
  <section className={`team-section my-8 ${animationClass}`}>
    <h2 className="section-title">{title.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
    <div className="team-container">
      {members.map((member, index) => (
        <div key={index} className="team-card">
          <img className="team-card-image" src={member.image} alt={member.name} />
          <div className="team-card-body">
            <h3 className="team-card-name">{member.name}</h3>
            <p className="team-card-dept">{member.dept}</p>
            <p className="team-card-role">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Team = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [fadeQuote, setFadeQuote] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500); 
    const quoteTimer = setTimeout(() => setShowQuote(true), 2500);
    const fadeTimer = setTimeout(() => setFadeQuote(true), 3500); 

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(quoteTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className="team-wrapper mx-auto p-4 md:p-8">
      <h1 className={`team-heading text-center mb-8 ${showTitle ? 'typing-animation increase-font-size' : 'team-heading-wrapper'}`}>
        OUR TEAM
      </h1>

      {showQuote && (
        <div className="quote-container">
          <p className="quote-text quote-animation">"WIRED FOR SUCCESS"</p>
          <p className={`quote-description ${fadeQuote ? 'fade-in' : 'fade-out'}`}>
            Fusing our energies dynamically to create electric achievements and transformative outcomes.
          </p>
        </div>
      )}

      {Object.keys(teamMembers).map((teamKey, index) => {
        let animationClass = '';
        if (index % 2 === 0) {
          animationClass = 'slide-left';
        } else {
          animationClass = 'slide-right';
        }
        return (
          <TeamSection 
            key={index} 
            title={teamKey} 
            members={teamMembers[teamKey]} 
            animationClass={animationClass} 
          />
        );
      })}
    </div>
  );
};

export default Team;
