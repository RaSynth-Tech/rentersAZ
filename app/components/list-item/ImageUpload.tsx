import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  category: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesUploaded, category }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await uploadImages(files);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      await uploadImages(files);
    };
    input.click();
  };

  const uploadImages = async (files: File[]) => {
    const uploadedImageUrls: string[] = [];
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

    for (const file of files) {
      try {
        // Append the category before the file name if a category is selected
        const uniqueId = uuidv4().slice(0, 4); // Generate a short UUID
        const fileNameWithCategory = category
        ? `${category}/${uniqueId}-${file.name}`
        : `random/${uniqueId}-${file.name}`;

        // Request a presigned URL from your API endpoint with the modified fileName
        const res = await fetch('/api/products/image/generatePresignedUrl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: fileNameWithCategory,
            fileType: file.type,
          }),
        });
        if (!res.ok) {
          throw new Error('Failed to get presigned URL');
        }
        const { url: presignedUrl } = await res.json();

        // Upload the file directly to S3 using the presigned URL
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });
        if (!uploadRes.ok) {
          throw new Error('Upload failed');
        }

        // Construct the public URL for the uploaded file
        const publicUrl = `https://${bucketName}.s3.amazonaws.com/${fileNameWithCategory}`;
        uploadedImageUrls.push(publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    onImagesUploaded(uploadedImageUrls);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        border: dragging ? '2px dashed #0070f3' : '2px dashed #ccc',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: '48px', color: '#0070f3' }}>+</div>
      <p>Drag and drop images here or click to upload</p>
    </div>
  );
};

export default ImageUpload;
