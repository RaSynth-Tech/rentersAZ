import React, { useState } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  category: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange, category }) => {
  const [dragging, setDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => {
      const selectedFiles = Array.from((e.target as HTMLInputElement).files || []);
      handleFiles(selectedFiles);
    };
    input.click();
  };

  const handleFiles = async (newFiles: File[]) => {
    setIsProcessing(true);
    try {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onImagesChange(updatedFiles);

      // Create preview URLs for new files
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    
    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onImagesChange(updatedFiles);
  };

  return (
    <Box>
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        sx={{
          border: dragging ? '2px dashed #0070f3' : '2px dashed #ccc',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          mb: 2,
          position: 'relative',
          opacity: isProcessing ? 0.7 : 1,
          pointerEvents: isProcessing ? 'none' : 'auto',
        }}
      >
        {isProcessing && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
        <Typography variant="h1" sx={{ fontSize: '48px', color: '#0070f3' }}>+</Typography>
        <Typography>Drag and drop images here or click to upload</Typography>
      </Box>

      {previewUrls.length > 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2 }}>
          {previewUrls.map((url, index) => (
            <Box key={url} sx={{ position: 'relative' }}>
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <IconButton
                onClick={() => removeImage(index)}
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
