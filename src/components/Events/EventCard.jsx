import React, { useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import "./EventCard.css";

export default function EventCard({ event }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const nextSlide = (e) => {
    e.stopPropagation();
    const nextIndex = (currentSlide + 1) % event.images.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    const prevIndex =
      (currentSlide - 1 + event.images.length) % event.images.length;
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
            {event.images.length > 1 && !showDescription  && (
              <>
                <button className="prev" onClick={prevSlide}>
                  &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                  &#10095;
                </button>
              </>
            )}
            <div className="slides">
              {event.images.map((image, idx) => (
                idx === currentSlide && (
                  <Image
                    key={idx}
                    alt={`Event ${event.name} Image ${idx + 1}`}
                    className="object-cover"
                    src={image.url}
                  />
                )
              ))}
            </div>
          </div>
          {showDescription && (
            <div className="description-container">
              <h4 className="event-title">{event.name}</h4>
              <p className="event-description">{event.description}</p>
              <p className="event-date">{event.date}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
