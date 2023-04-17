import React from 'react';
import { View } from 'react-native';
import Localizacao from './src/Localizacao';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Localizacao />
    </View>
  );
}
