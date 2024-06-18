import React, { useState } from 'react';
import './VideotTestimonials.css';

const VideoTestimonial = ({ video, thumbnail, name, title, quote }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {

        // Open modal or navigate to video page
    };

    return (
        <div
            className={`testimonial ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <img src={thumbnail} alt={name} />
            <h3>{name}</h3>
            <p>{title}</p>
            <p>{quote}</p>
        </div>
    );
};

const VideoTestimonials = () => {
    return (
        <div className="video-testimonials">
            <h2>Title</h2>
            <div className="grid">
                <VideoTestimonial
                    video="video1.mp4"
                    thumbnail="thumbnail1.jpg"
                    name="Name 1"
                    title="Title 1"
                    quote="Quote 1"
                />
                {/* Add more VideoTestimonial components */}
            </div>
        </div>
    );
};

export default VideoTestimonials;