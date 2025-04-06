'use client';

import React from 'react';
import { useProducts } from '../context/ProductContext';
import { CircularProgress, Button, Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface ViewMoreButtonProps {
  className?: string;
}

export default function ViewMoreButton({ className = '' }: ViewMoreButtonProps) {
  const { loadMore, loadingMore, hasMore } = useProducts();

  if (!hasMore) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 2,
        width: '100%'
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={loadMore}
        disabled={loadingMore}
        startIcon={loadingMore ? <CircularProgress size={20} color="inherit" /> : <ArrowDownwardIcon />}
        sx={{
          borderRadius: '50px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
          },
          minWidth: '180px'
        }}
      >
        {loadingMore ? 'Loading...' : 'View More'}
      </Button>
    </Box>
  );
} 