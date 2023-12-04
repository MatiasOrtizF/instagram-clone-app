import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { PostProvider } from './src/context/usePost';

export default function App() {
  return (
    <PostProvider>
      <Navigation/>
    </PostProvider>
  );
}