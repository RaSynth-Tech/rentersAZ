import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/config';
import ListItemForm from '../../components/list-item/ListItemForm';
import { Container } from '@mui/material';

export default async function ListPage() {

  return (
    <ListItemForm />
  );
} 