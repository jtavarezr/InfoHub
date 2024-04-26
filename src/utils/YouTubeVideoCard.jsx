import React from "react";
import Card from "react-bootstrap/Card";

const YouTubeVideoCard = () => {
  const videoUrls = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=9bZkp7q19f0",
    "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  ];

  return (
    <div>
      {videoUrls.map((url, index) => (
        <Card key={index}>
          <Card.Body>
            <iframe
              width="50%"
              height="415"
              src={url.replace("watch?v=", "embed/")}
              title={`YouTube Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default YouTubeVideoCard;
