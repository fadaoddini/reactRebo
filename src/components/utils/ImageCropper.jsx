import React, { useState } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ unit: 'px', width: 600, height: 600 });
  const [completedCrop, setCompletedCrop] = useState(null);
  
  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
    console.log('Crop completed:', crop); // بررسی مقادیر کراپ
  };

  const handleSave = () => {
    if (completedCrop && src) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const { width, height } = image;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        ctx.drawImage(
          image,
          completedCrop.x,
          completedCrop.y,
          completedCrop.width,
          completedCrop.height,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        );
        canvas.toBlob((blob) => {
          onCropComplete(blob);
        }, 'image/jpeg', 0.72);
      };
    }
  };

  return (
    <div>
      <Cropper
        src={src}
        crop={crop}
        onChange={setCrop}
        onComplete={handleCropComplete}
      />
      <button onClick={handleSave}>ذخیره</button>
      <button onClick={onCancel}>لغو</button>
    </div>
  );
};

export default ImageCropper;
