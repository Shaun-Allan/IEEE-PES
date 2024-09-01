import React, { useEffect, useState } from 'react';
import './Team.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/DatabaseServices/FirebaseConfig.js';  
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const TeamSection = ({ title, members }) => {
  if (title === "Office Bearers") {
    const chairperson = members.find(member => member.Role.toLowerCase() === 'chairperson');
    const otherMembers = members.filter(member => member.Role.toLowerCase() !== 'chairperson');

    return (
      <section className="team-section my-8">
        <h2 className="section-title">{title.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
        <div className="team-container">
          {chairperson && (
            <div className="team-card">
              <img className="team-card-image" src={chairperson.Image} alt={chairperson.Name} />
              <div className="team-card-body">
                <h3 className="team-card-name">{chairperson.Name}</h3>
                <p className="team-card-dept">{chairperson.Dept}</p>
                <p className="team-card-role">{chairperson.Role}</p>
                <p className="team-card-year">{chairperson.Year}</p>
              </div>
            </div>
          )}
        </div>
        <div className="team-container mt-8">
          {otherMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img className="team-card-image" src={member.Image} alt={member.Name} />
              <div className="team-card-body">
                <h3 className="team-card-name">{member.Name}</h3>
                <p className="team-card-dept">{member.Dept}</p>
                <p className="team-card-role">{member.Role}</p>
                <p className="team-card-year">{member.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="team-section my-8">
      <h2 className="section-title">{title.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
      <div className="team-container">
        {members.map((member, index) => (
          <div key={index} className="team-card">
            <img className="team-card-image" src={member.Image} alt={member.Name} />
            <div className="team-card-body">
              <h3 className="team-card-name">{member.Name}</h3>
              <p className="team-card-dept">{member.Dept}</p>
              <p className="team-card-role">{member.Role}</p>
              <p className="team-card-year">{member.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const [teamData, setTeamData] = useState({});
  const [showTitle, setShowTitle] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [fadeQuote, setFadeQuote] = useState(false);

  // Function to fetch image URLs from Firebase Storage
  const fetchImageURL = async (category, imageName) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `/Team/${category}/${imageName}`);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchNestedData = async () => {
      try {
        const categories = ['Office Bearers', 'Vertical','Technical','Design', 'PR', 'Event Management'];
        const results = {};

        for (const category of categories) {
          const categorySnapshot = await getDocs(collection(db, `Team/Team Members/${category}`));

          if (!categorySnapshot.empty) {
            const categoryData = await Promise.all(
              categorySnapshot.docs.map(async (doc) => {
                const docData = doc.data();
                const imageUrl = await fetchImageURL(category, docData.Image);
                return { id: doc.id, ...docData, Image: imageUrl };
              })
            );
            results[category] = categoryData;
          } else {
            results[category] = [];
          }
        }

        setTeamData(results);
      } catch (err) {
        console.error('Error fetching nested data:', err);
      }
    };

    fetchNestedData();

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

      {Object.keys(teamData).map((teamKey, index) => (
        <TeamSection 
          key={index} 
          title={teamKey} 
          members={teamData[teamKey]} 
        />
      ))}
    </div>
  );
};

export default Team;
