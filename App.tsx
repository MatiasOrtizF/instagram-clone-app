import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { PostProvider } from './src/context/usePost';

// Polyfill específico para Hermes
declare global {
  var CustomHermesInternal: null | {
    global: unknown;
    version: string;
    engine: string;
  };
}

if (global.CustomHermesInternal) {
  const { TextEncoder, TextDecoder } = require('text-encoding');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}


export default function App() {
  return (
    <PostProvider>
      <Navigation/>
    </PostProvider>
  );
}