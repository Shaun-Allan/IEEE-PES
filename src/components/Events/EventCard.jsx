import React, { useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import "./EventCard.css";

export default function EventCard({ event }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

 
  const imageUrls = Array.isArray(event.ImageUrls) ? event.ImageUrls : [];

  const nextSlide = (e) => {
    e.stopPropagation();
    if (imageUrls.length === 0) return;
    const nextIndex = (currentSlide + 1) % imageUrls.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (imageUrls.length === 0) return;
    const prevIndex = (currentSlide - 1 + imageUrls.length) % imageUrls.length;
    setCurrentSlide(prevIndex);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Card className="event-card">
      <CardBody className="p-0 relative overflow-hidden">
        <div className="slider-container" onClick={toggleDescription}>
          <div className="image-container">
            {imageUrls.length > 1 && !showDescription && (
              <>
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
              </>
            )}
            <div className="slides">
              {imageUrls.length > 0 && (
                <Image
                  alt={`Event ${event.name} Image ${currentSlide + 1}`}
                  className="object-cover"
                  src={imageUrls[currentSlide]}
                  width="100%" 
                  height="auto" 
                />
              )}
            </div>
            {!showDescription && imageUrls.length > 0 && (
              <div className="click-to-know-more">
                Click to know more
              </div>
            )}
          </div>
          {showDescription && (
            <div className="description-container">
              <h4 className="event-title">{event.name}</h4>
              <p className="event-date">{event.date}</p>
              <p className="event-description">{event.description}</p>
            </div>
          )}
        </div>  
      </CardBody>
    </Card>
  );
}
