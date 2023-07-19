import { Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DivisaFormater } from '../../src/utils/divisa-formater';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { cyperApi } from '../api';

export default function Home({navigation}:any) {
    const {user} = useSelector((state: any) => state.auth);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [actualCategory, setActualCategory] = useState<string>('');
  const [error, setError] = useState('');
  const fetchProducts = async () => {

    try{
      const { data } = await axios.get(`${cyperApi}/api/v1/products`, {
        headers: {
       'api-key':
           'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
   }});
   
     setProducts(data)
     
    }catch(err){
      setError(JSON.stringify(err))
    }
  } 

  const fetchCategories = async () => {

    try{
      const { data } = await axios.get(`${cyperApi}/api/v1/categories`, {
        headers: {
       'api-key':
           'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
   }});
   
     setCategories(data)
    }catch(err){
      setError(JSON.stringify(err))
    }
  } 


  useEffect(() => {
     fetchCategories();
     fetchProducts();
  }, [actualCategory]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  backgroundColor='#f6f7f9' translucent />
      <View>
        <View style={{
          marginBottom: 20
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}>

          <Text style={{
          fontSize: 18,
          fontWeight: '600'
        }}>Hola, {user.name}</Text>
        <Image 
        style={{
          width: 23,
          height: 23
        }}
        source={{
          uri: 'https://i.ibb.co/gzfqspJ/waving-hand-1f44b.png'
        }} /> 
          </View>
          <Text style={{
            fontSize: 14,
            color:'rgba(0,0,0,0.6)'
          }}>Bienvenido a Cyber Link!</Text>

        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.05)',
          borderRadius: 5,
          paddingHorizontal: 10,
          height: 45,
          marginBottom: 10,
          backgroundColor: '#fff'
        }}>
          <Ionicons name="search-outline" color="rgba(0,0,0,0.6)" size={25} />
          <TextInput style={{
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#fff',
            width: '80%'
          }} placeholder="Buscar productos" onChangeText={(text) => setSearch(text)} />
        </View>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 10
        }}>Descubre</Text>
        <ScrollView horizontal>
        <TouchableOpacity 
        onPress={() => setActualCategory('')}
        style={{
              marginRight: 10,
              backgroundColor: actualCategory == ''? '#01138F' : 'rgba(255,255,255,0.3)',
              height: 35,
              width: 'auto',
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'rgba(0,0,0,0.05)',
            }}>
              <Text
                style={{
                  color: actualCategory == ''? '#fff' : '#000',
                }}
              >Todo</Text>
            </TouchableOpacity>
          {categories.map((category: any) => (
            <TouchableOpacity
            key={category.uuid}
            onPress={() => setActualCategory(category.name)}
            style={{
              marginRight: 10,
              backgroundColor: actualCategory == category.name? '#01138F' : 'rgba(255,255,255,0.3)',
              height: 35,
              width: 'auto',
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'rgba(0,0,0,0.05)',
            }}>
              <Text
              style={{
                color: actualCategory == category.name? '#fff' : '#000',
              }}
              >{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    
      <View style={{
        marginTop:15,
        marginBottom: 85
      }}>
        <ScrollView 
 contentContainerStyle={{
  flexDirection: 'row',
  flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'center',
    gap: 10
 }}>
     
        {products.filter((product: any) => product?.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        .filter((product: any) => actualCategory == ''?  product : product.category?.name == actualCategory)
        .map((product:any) => (
          
        <TouchableOpacity 
        onPress={() => navigation.navigate("Product", {product: product.uuid})}
        key={product.uuid}>
          <View style={{
          width: 180,
          padding: 10,
          borderRadius: 5,
          marginBottom: 5,
          backgroundColor: '#fff',
          shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>


          <Image 
          style={{
            width: 130,
            height: 130,
            resizeMode: 'contain'
          }}
          source={{
            uri: product.images? product.images : 'https://i.ibb.co/1rQP2bR/no-image-icon-4.png'
          }} />
          </View>

          <Text>{product.name}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>

          <Text style={{
            textAlign: 'right',
            fontWeight: '700'
          }}>{DivisaFormater({value: product.sale_price})}</Text>
          <TouchableOpacity style={{
            backgroundColor: '#01138F',
            height: 20,
            width: 20,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color:'white',
            }}>+</Text>
          </TouchableOpacity>
          </View>
          
          </View>
        
        </TouchableOpacity>
        ))}
        </ScrollView>
        
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    backgroundColor: '#f6f7f9'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
