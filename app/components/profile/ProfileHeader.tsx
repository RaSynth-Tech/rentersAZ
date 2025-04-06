'use client';

import { Box, Avatar, Typography, Button, Grid } from '@mui/material';
import { User } from '@/app/services/user.service';
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  const router = useRouter();
  console.log(user);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
      <Avatar
        src={user.profilePicture}
        sx={{ width: 120, height: 120, mb: 2 }}
      >
        {user?.name}
      </Avatar>
      <Typography variant="h5" gutterBottom>
        {user.name}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Member since {new Date(user.createdAt).toLocaleDateString()}
      </Typography>
      
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onEditClick}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/my-items')}
        >
          View My Items
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/list')}
        >
          List New Item
        </Button>
      </Box>
    </Box>
  );
} 