import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AboutComponent({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sobre esta App</Text>
      <Text>App creada en react native con expo</Text>
      <Text>MirandaLucasAbel/aplicaciones-moviles-tp1</Text>
    </View>
  );
}