import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeComponent({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="ingresar"
        onPress={() => navigation.navigate('poke')}
      />
      <Button
        title="About"
        onPress={() => navigation.navigate('about')}
      />
    </View>
  );
}