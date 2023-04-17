import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import getCepApi from './services/serviceGoogle';
import getEndereco from "./services/serviceViaCep";

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cep, setCep] = useState(null);
  const [endereco, setEndereco] = useState(null);


  useEffect(() => {
    const getLocationAsync = async () => {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const location = await getCurrentPositionAsync();
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    };

    getLocationAsync();
  }, []);

  useEffect(() => {
    const cep = async () => {
      const cep = await getCepApi(latitude, longitude);
      console.log(cep)
      setCep(cep);
    };

    if (latitude && longitude) {
      cep();
    }
  }, [latitude, longitude, cep]);
  
  // chama service(API) da viacep que converte cep para o endereço.
  const buscaEndereco = async () => {
    const endereco = await getEndereco(cep);
    setEndereco(endereco);
    console.log(endereco);
  };

  return (
    <View style={styles.container}>
    <View style={styles.conteudo}>
      <Text style={styles.titulo}>Localização</Text>
      <Text style={styles.text}>Latitude: {latitude}</Text>
      <Text style={styles.text}>Longitude: {longitude}</Text>
      {cep && <Text style={styles.text}>CEP: {cep}</Text>}
      {endereco && <Text style={styles.text}>Endereço: {endereco.logradouro}, {endereco.bairro} - {endereco.uf}</Text>}
      <TouchableOpacity style={styles.button} onPress={buscaEndereco}>
        <Text style={styles.textBotao}>Buscar Endereço</Text>
      </TouchableOpacity>
    </View>
  </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0011',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  conteudo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textBotao: {
    color: '#fff',
    fontSize: 18,
  },
});
