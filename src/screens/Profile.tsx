import { Text } from 'react-native';
import { usePost } from '../hooks/postContext';
import { useEffect } from 'react';

export default function Profile() {
  const {getAllSave} = usePost();

  useEffect(()=> {
    getAllSave();
  }, [])

  return (
    <Text>Profile</Text>
  );
}