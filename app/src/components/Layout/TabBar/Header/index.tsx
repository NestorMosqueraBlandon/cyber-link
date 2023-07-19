import React from 'react'
import { Text, View } from '../../../../../components/Themed'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

interface Props {
  title: string
  navigation: any
}
const Header = ({title, navigation}: Props) => {
  const cartItems = useSelector((state:any) => state.cart);

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 30
    }}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back-outline' size={30} />
            </TouchableOpacity>
      <Text style={{
        fontSize: 18,
        fontWeight: '600'
      }}>{title}</Text>
      <View>
        {cartItems.length > 0 && (

        <Text style={{
          position: 'absolute',
          right: -5,
          top: -3,
          backgroundColor: 'red',
          height: 17,
          width: 17,
          borderRadius: 50,
          color: 'white',
          paddingLeft: 5,
          zIndex: 10,
          fontSize: 12,
        }}>{cartItems.length}</Text>
        )}

      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Ionicons name='ios-cart-outline' size={30} />
            </TouchableOpacity>
            </View>

    </View>
  )
}

export default Header
