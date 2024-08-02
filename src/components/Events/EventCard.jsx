import React, { useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import "./EventCard.css"; 

export default function EventCard({ event }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % event.images.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      (currentSlide - 1 + event.images.length) % event.images.length;
    setCurrentSlide(prevIndex);
  };

  return (
    <Card className="event-card">
      <CardHeader className="pb-0 pt-2 px-4 flex-row items-start">
        <h4 className="font-bold text-large">{event.name}</h4>
      </CardHeader>
      <CardBody className="p-0 relative overflow-hidden">
        <div className="slider-container">
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="slides">
            {event.images.map((image, idx) => (
                idx === currentSlide ? <Image
                  alt={`Event ${event.name} Image ${idx + 1}`}
                  className="object-cover rounded-xl h-full"
                  src={image.url}
                /> : <div></div>
            ))}
          </div>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
