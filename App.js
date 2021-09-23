import * as React from 'react';

import {
  View,
  StyleSheet,

} from 'react-native';

import Constants from 'expo-constants';


import PokeCard from './src/PokeCard';

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
    padding: 8
  }
});
