import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({ onDrop }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
        onDrop(file); // Call the onDrop function passed as a prop
      }
    },
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>در حال کشیدن تصویر به اینجا...</p>
        ) : (
          <div className={styles.uploadContent}>
            <p>تصویر خود را اینجا بکشید و رها کنید یا کلیک کنید تا انتخاب کنید</p>
            <p>(پشتیبانی از تصاویر)</p>
          </div>
        )}
      </div>
      {imagePreview && (
        <div className={styles.imagePreview}>
          <img src={imagePreview} alt="Preview" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
