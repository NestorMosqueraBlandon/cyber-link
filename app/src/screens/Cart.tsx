import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { DivisaFormater } from '../../src/utils/divisa-formater';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, removeItem } from '../store/features/cart';
import Header from '../components/Layout/TabBar/Header';

export default function Cart({navigation}: any) {

    const cartItems = useSelector((state:any) => state.cart);
    const dispatch = useDispatch();

    
    const handleAddItem = (item:any) => {
        dispatch(addItem(item));
      };    
    
      const handleRemoveItem = (item:any) => {
        dispatch(removeItem(item));
      };    
      const clearCartHandler = () => {
        dispatch(clearCart());
      };    
    
      const total = cartItems.reduce((a:any, c:any) => a + c.price * c.quantity, 0)
  return (
    <View style={styles.container}>
        <Header navigation={navigation} title='Carrito' />

        <ScrollView contentContainerStyle={{
            marginTop: 15
        }} >
            {cartItems?.map((item:any) => (

            <View 
            key={item.uuid}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 100,
                gap: 20,
                borderRadius: 10,
                paddingRight: 10,
                backgroundColor: 'rgba(0,0,0,0.05)',
                marginBottom: 15
            }}>
                <Image 
                style={{
                    width: 110,
                    height: 110,
                    resizeMode: 'contain',
                }}
                source={{
                    uri: item.images ? item.images : 'https://i.ibb.co/1rQP2bR/no-image-icon-4.png'
                }} />
                <View>
                    <Text style={{
                        fontWeight: '600'
                        }}>{item.name}</Text>
                    <Text style={{
                        fontWeight: '600'
                        }}>{DivisaFormater({value: item.price})}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignContent: 'flex-end'
                }}>
                <TouchableOpacity 
                 onPress={() => handleRemoveItem(
                    {
                        name: item?.name,
                        category: item?.category?.name,
                        price: item?.sale_price,
                        quantity: 1,
                        uuid: item?.uuid,
                    }
                )}
                style={{
                    backgroundColor: 'rgb(59,96,164)',
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><Text style={{
                    fontSize: 20,
                    color: 'white'
                }}>-</Text></TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity 
                     onPress={() => handleAddItem(
                        {
                            name: item?.name,
                            category: item?.category?.name,
                            price: item?.sale_price,
                            quantity: 1,
                            uuid: item?.uuid,
                        }
                    )}
                    style={{
                    backgroundColor: 'rgb(59,96,164)',
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><Text style={{
                    fontSize: 20,
                    color: 'white'
                }}>+</Text></TouchableOpacity>
                </View>
            </View>
            ))}

            {cartItems.length <= 0 && 
            <View style={{
                marginTop: 100
            }}>

                <Image
                style={{
                    width:150,
                    height:150,
                    resizeMode: 'contain',
                }}
                source={{
                    uri: 'https://i.ibb.co/XFSYkBB/7077465.png'
                }} />
            <Text style={{
                fontSize: 22
            }}>El carrito esta vacio</Text>
            </View>}

        </ScrollView>
      {cartItems.length > 0 && (
<>
      <View style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 'auto',
        marginBottom: 80
      }}> 
        <Text  style={{
            fontSize: 18
        }}>Total:</Text>
        <Text style={{
            fontWeight:"600",
            fontSize: 22
        }}>{DivisaFormater({value: total})}</Text>
      </View>

      
      <TouchableOpacity 
      onPress={() => navigation.navigate('TransferMethod')}
      style={{
            position: 'absolute',
            bottom: 20,
            // right: 20,
            backgroundColor: 'rgb(59,96,164)',
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
            }}>Continuar</Text>
        </TouchableOpacity>
</>


)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10,
    alignItems: 'center',
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
