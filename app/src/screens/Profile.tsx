import React from 'react'
import { Text, View } from '../../components/Themed'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../store/features/auth';
import { TouchableOpacity } from 'react-native';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();
    const logout = () => {
      dispatch(signout());
    };
  return (
    <View style={
      {
        flex: 1,
        paddingHorizontal:10,
        alignItems: 'center',
      }
    }>
        <View style={{
          marginTop: 50,
          width: '100%',
        }}>
          <Text style={{
            fontWeight: '600',
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 40
          }}>DATOS PERSONALES</Text>
          <View style={{
          width: '100%',
        }}>
            <View style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>
              <Text style={{
                fontWeight: '600',
                fontSize: 16
              }}>Nombre</Text>
              <Text style={{
                fontSize: 16
              }}>{user.name}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>
              <Text style={{
                fontWeight: '600',
                fontSize: 16
              }}>Apellido</Text>
              <Text style={{
                fontSize: 16
              }}>{user.lastname}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>
              <Text style={{
                fontWeight: '600',
                fontSize: 16
              }}>Telefono</Text>
              <Text style={{
                fontSize: 16
              }}>{user.phone}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>
              <Text style={{
                fontWeight: '600',
                fontSize: 16
              }}>Correo</Text>
              <Text style={{
                fontSize: 16
              }}>{user.email}</Text>
            </View>
          </View>
          <View style={{
            marginTop: 20
          }}>
            <TouchableOpacity style={{
              backgroundColor: '#01138F',
              height: 40,
              borderRadius: 10
            }}>
              <Text style={{
                textAlign: 'center',
                color: 'white',
                marginTop: 10
              }}>Mis Compras</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{
            position: 'absolute',
            bottom: 20,
            // right: 20,
            backgroundColor: '#C62828',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
        }} onPress={logout}>
          <Text style={{
            color: 'white'
          }}>Cerrar Sesion</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Profile
