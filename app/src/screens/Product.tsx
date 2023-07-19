import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link, Tabs } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { DivisaFormater } from '../utils/divisa-formater';
import { addItem } from '../store/features/cart';
import Header from '../components/Layout/TabBar/Header';
import { cyperApi } from '../api';

export default function Product({navigation, route}: any) {

    const [product, setProduct] = useState<any>();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const fetchProduct = async () => {
  
      try{
        const { data } = await axios.get(`${cyperApi}/api/v1/products/${route.params.product}`, {
          headers: {
         'api-key':
             'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
     }});
     
       setProduct(data)
      }catch(err){
        setError(JSON.stringify(err))
      }
    } 

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
    
  
  
    useEffect(() => {
       fetchProduct();
       fetchProducts();
    }, []);

    const dispatch = useDispatch();
  
    const handleAddItem = (item:any) => {
      dispatch(addItem(item));
      navigation.navigate('Cart');
    };    
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title='Detalles del Producto' />
       
      <Image 
          style={{
            width: 250,
            height: 250,
            resizeMode: 'contain'
          }}
          source={{
            uri: product?.images ? product.images : 'https://i.ibb.co/1rQP2bR/no-image-icon-4.png'
          }} />

<View style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            paddingLeft: 10
        }}>

          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'left'
          }}>{product?.name}</Text>
           <Text style={{
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'left',
            color: '#333'
          }}>{product?.category?.name}</Text>
          <Text style={{
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'left',
            color: 'rgb(59,96,164)'
          }}>{DivisaFormater({value: product?.sale_price})}</Text>
        </View>
        <View style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            paddingLeft: 10
        }}>

          <Text style={{
            fontSize: 18,
            marginTop: 29,
            fontWeight: '600',
            textAlign: 'left'
          }}>Productos relacionados</Text>
           <ScrollView 
    horizontal
contentContainerStyle={{
    justifyContent:'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10
 }}>

     
        {products.filter((pro: any) => pro.category?.name == product?.category?.name)
        .map((pro:any) => (
          
        <TouchableOpacity 
        onPress={() => navigation.navigate("Product", {product: product.uuid})}
        key={pro.uuid}>
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
            width: 100,
            height: 100,
            resizeMode: 'contain'
          }}
          source={{
            uri: pro.images? pro.images:'https://i.ibb.co/1rQP2bR/no-image-icon-4.png'
          }} />
          </View>

          <Text>{pro.name}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>

          <Text style={{
            textAlign: 'right',
            fontWeight: '700'
          }}>{DivisaFormater({value: pro.sale_price})}</Text>
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

        
        

        <TouchableOpacity 
        onPress={() => handleAddItem(
            {
                name: product?.name,
                category: product?.category?.name,
                price: product?.sale_price,
                quantity: 1,
                uuid: product?.uuid,
                images: product?.images
            }
        )}
        style={{
            position: 'absolute',
            bottom: 20,
            // right: 20,
            backgroundColor: '#01138F',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
        }}>
            <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center'
            }}>Agregar al carrito</Text>
        </TouchableOpacity>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10,
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
