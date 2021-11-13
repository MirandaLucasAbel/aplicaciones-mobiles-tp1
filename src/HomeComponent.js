import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeComponent({ navigation }) {
  return (
    <View style={{ display:'flex',flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <Text>Home Screen</Text>
      <Button
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:40}}
        title="ingresar"
        onPress={() => navigation.navigate('poke')}
      />
      <Button
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:40}}
        title="About"
        onPress={() => navigation.navigate('about')}
      />
    </View>
  );
}