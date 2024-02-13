"use client"
import { useState } from 'react';
import DrawingComponent from './DrawingComponent';

interface ImageWithPopupProps {
  imageUrl: string;
}

const ImageWithPopup: React.FC<ImageWithPopupProps> = ({ imageUrl }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button onClick={handleImageClick}>Edit me</button>
      {isPopupOpen && (
        <div className="popup">
          <DrawingComponent imageSrc={imageUrl} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
};

export default ImageWithPopup;