import { StyleSheet, Image, TouchableOpacity, TextInput, View as DefaultView, Text } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {signin} from '../store/features/auth';
import { View } from '../../components/Themed';
import { cyperApi } from '../api';

export default function Register({navigation}: any) {

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signinThunk = async () => {

    try{
      const { data } = await axios.post(`${cyperApi}/api/v1/register-client`, {name, lastname, email, phone, password}, {
        headers: {
       'api-key':
           'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
   }});
   
    //  setUser(data)
     return data;
    //  console.log(data)
    }catch(err){
      setError(JSON.stringify(err))
    }
  } 

  const dispatch = useDispatch();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signinThunk();
      
      dispatch(signin(data));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DefaultView style={styles.container}>
      <Image 
      style={{
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 50
      }}
      source={{
        uri: 'https://i.ibb.co/6vm1cRz/cl-logo.png'
      }} />
      <View style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
      }}>
      <TextInput  
      onChangeText={(text) =>setName(text)}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '44%',
      }} placeholder='Nombre'  />
      <TextInput  
      onChangeText={(text) =>setLastName(text)}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '44%',
      }} placeholder='Apellido'  />
      </View>
      
      <TextInput  
      onChangeText={(text) =>setEmail(text)}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '90%',
      }} placeholder='Correo electronico'  />
       <TextInput  
      onChangeText={(text) =>setPhone(text)}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '90%',
      }} placeholder='Telefono'  />
      <TextInput  
      onChangeText={(text) =>setPassword(text)}
      secureTextEntry
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '90%',
      }} placeholder='Contraseña'  />

      <TouchableOpacity 
      onPress={onSubmit}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01138F',
      }}>
        <Text style={{
          color: 'white',
          fontWeight: '500',
          fontSize: 16,
        }}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate('Signin')}
      style={{
                padding: 10,
                marginTop: 10,
                width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontWeight: '500',
          fontSize: 14,
        }}>Ya tienes cuenta? <Text style={{
          color: '#01138F'
        }}>Inicia sesion</Text> </Text>
      </TouchableOpacity>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
