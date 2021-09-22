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
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default function App() {
  const [data, setData] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [exp, setExp] = useState(0);
  const [nivel, setNivel] = useState(0);

  const generatePokeId = () => {
    let max = 898;
    let min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    console.log("iniciando")
    buscarPokemon();
  }, []);

  const getValueFunction = (v, f) => {
    AsyncStorage.getItem(v).then((value) => {
      f(value);
    });
  };

  const saveValueFunction = (k, v) => {
    AsyncStorage.setItem(k, v);
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

  const nuevoPokemon = async () => {
    console.log("nuevo");
    setLoading(true);
    reset();
    let pokeId = generatePokeId();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
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
    minWidth: '100%',
    minWidthh: '100%',
    resizeMode: 'cover',
  },
  button: {
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
  },
});