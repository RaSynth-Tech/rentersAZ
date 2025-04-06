import { Container, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Container>
  );
} 