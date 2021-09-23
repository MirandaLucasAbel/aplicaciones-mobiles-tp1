import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

import PokeCard from './PokeCard';

export default function App() {
  
  return (
    <View style={styles.container}>
      <PokeCard></PokeCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagen: {
    height: 300,
    margin: 10,
   

    resizeMode: 'cover',
    marginRight: 7
  },
  button: {
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
