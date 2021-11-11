import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';

import {


  StyleSheet,
  Image,
  //TextInput,
  TouchableOpacity,

  ActivityIndicator,
} from 'react-native';

import { buscarPokemonPorNombre,calcularNivel } from './servicios/pokeApi';
import { Card } from 'react-native-paper';

export default function SeachComponent({ navigation }) {

  const [buscar, setBuscar] = useState(" ");
  const [imagen, setImagen] = useState(" ");
  const [nombre, setNombre] = useState(" ");
  const [id, setId] = useState(" ");

  const buscarPokemon = async()=>{
    await buscarPokemonPorNombre(buscar.text)
      .then(response => {
        setImagen(response.img);
        setNombre(response.name);
        setId(response.id);
        setBuscar("")
      console.log(response);
    });
  }

  

  return (
    <View>
      <Text >{id} {nombre} </Text>
      <Card>
       
          <Image source={{ uri: imagen }}  style={styles.imagen}  />
     
      </Card>
      <TextInput
        label='Ingrese un nombre o ID'
        value={buscar.text}
        onChangeText={text => setBuscar({ text })}
      />
        <Button
        title="buscar"
        onPress={() => buscarPokemon()}
      />

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
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
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,

  },
});
