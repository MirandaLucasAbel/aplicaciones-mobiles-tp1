import * as React from 'react';

import {
  View,
  StyleSheet,
  Text

} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Constants from 'expo-constants';


import PokeCard from './src/PokeCard';
import HomeComponent from './src/HomeComponent';
import AboutComponent from './src/AboutComponent';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    /*
    <View style={styles.container}>
      <PokeCard></PokeCard>
    </View>
    */
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeComponent">
      <Stack.Screen name="Home" component={HomeComponent} />
      <Stack.Screen name="poke" component={PokeCard} />
      <Stack.Screen name="about" component={AboutComponent} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  }
});
