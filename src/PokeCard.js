import * as React from 'react';
import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Text,
  View,
  StyleSheet,
  Image,
  //TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';



export default function PokeCard({ navigation }) {

  const [data, setData] = useState([]);
  const [imagen, setImagen] = useState(" ");
  const [nombre, setNombre] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [exp, setExp] = useState(0);
  const [nivel, setNivel] = useState(1);

  const API = 'https://pokeapi.co/api/v2/pokemon/';





  useEffect(() => {
    console.log("iniciando")
    buscarPokemon();
  }, []);

  const getValueFunction = async (v, f) => {
    //AsyncStorage.getItem(v).then((value) => {
     // f(value);
   // });
   try {
    const value = await AsyncStorage.getItem(v);
    f(value);
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  };

  const saveValueFunction = async (k, v) => {
    //AsyncStorage.setItem(k, v);
    try {
    await AsyncStorage.setItem(k,v);
    }
    catch(error){
      console.log(error);
    }
  };

  const buscarPokemon = async () => {
    setLoading(true);
    await getValueFunction('img', setImagen);

    if (!imagen) {
      nuevoPokemon();
    } else {
      getValueFunction('exp', setExp);
      getValueFunction('lvl', setNivel);
      await getValueFunction('name', setNombre);
    }
    setLoading(false);
  };

  const reset = async () => {
    setNivel(1);
    setExp(0);
    saveValueFunction('exp', 0);
    saveValueFunction('lvl', 1);
  };

  const generatePokeId = () => {
    let max = 898;
    let min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const nuevoPokemon = async () => {
    console.log("nuevo");
    setLoading(true);
    reset();
    //let pokeId = generatePokeId();
    let pokeId =   generatePokeId();
    let url = `${API}${pokeId}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setNombre(json.name);
        let url = json.sprites.versions['generation-v']['black-white'].animated
          .front_default
          ? json.sprites.versions['generation-v']['black-white'].animated
              .front_default
          : json.sprites.front_default;
        
        setImagen(url);

        saveValueFunction('name', json.name);
        saveValueFunction('img', url);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log(imagen)
  };

  const subirExp = () => {
    setExp(parseInt(exp) + 1);
    calcularNivel();
    saveValueFunction('exp', exp);
    saveValueFunction('lvl', nivel);
  };

  const calcularNivel = () => {
    setNivel(
      Math.trunc(Math.floor(25 + Math.sqrt(625 + 100 * parseInt(exp))) / 50)
    );
  };

  return (
    <View style={styles.container}>
      <Card>
        <ActivityIndicator size="large" animating={isLoading} />
        <Text style={styles.paragraph}>
          {`${nombre}
nivel: ${nivel}
experiencia: ${exp}`}
        </Text>
      </Card>
      <Card>
        <TouchableOpacity activeOpacity={0.5} onPress={subirExp}>
           <Image source={{ uri: imagen }} style={styles.imagen} />
        </TouchableOpacity>
      </Card>
      <Button
        title="nuevo pokemon"
        onPress={nuevoPokemon}
        color="#f194ff"
        style={styles.button}></Button>
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
