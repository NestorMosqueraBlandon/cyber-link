import React, { useState } from 'react'
import { View } from '../../components/Themed'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import CloudinaryUploader from '../utils/uploadImage';
import { cyperApi } from '../api';
import { useSelector } from 'react-redux';

const TransferMethod = ({navigation}: any) => {
  const [uploader] = useState<CloudinaryUploader>(new CloudinaryUploader());
  const [photo, setPhoto] = useState<any | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const { user } = useSelector((state: any) => state.auth);
    const cartItems = useSelector((state:any) => state.cart);

    const handleChange = async () => {
    
      // const file = e.target.files?.item(0);
      console.log({photo})
      const file = photo.assets[0].uri; 
      if (file) {
        setFile(file);
        uploader.setFile(file);
      }
      await uploader.upload();
      setUploadedUrl(uploader.getUrl());
    };
    

    const handleChoosePhoto = async() => {
      const options = {
        title: 'Seleccionar foto de perfil',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response) => {
        if(response.didCancel){
          console.log("User cancelled image picker")
        }else if(response.errorMessage){
          console.log("Error: " + response?.errorMessage)
        }
      }).then(response => {
        const uri = response.assets? response.assets[0].uri : '';
          const type = response.assets? response.assets[0].type : '';
          const name = response.assets? response.assets[0].fileName : "";
          const source = {
            uri,
            type,
            name
          }
          
          console.log("Image ", source)
          cloudinaryUpload(source.uri)
        
      });
      
      const cloudinaryUpload = async(photo:any) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'r9rqkvzr')
        data.append("cloud_name", "r9rqkvzr")
        
        const res:any = await axios.post(
          "https://api.cloudinary.com/v1_1/matosr96/image/upload",
          data
        );
        
        console.log(res.data.secure_url)
        setUploadedUrl(res.data.secure_url)
      }
    };

    const total = cartItems.reduce((a:any, c:any) => a + c.price * c.quantity, 0)
    const products = cartItems.map((item:any) => {
      return item.uuid;
    })
    const sendPayment = async() => {
      try{
        const { data } = await axios.post(`${cyperApi}/api/v1/orders`, {client: user.uuid, products, total_price: total}, {
          headers: {
         'api-key':
             'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
     }});
     
       return data;
      }catch(err){
        console.log(JSON.stringify(err))
      }

      navigation.navigate('HomeScreen')
    }
  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        width: '100%'
    }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <Image style={{
            width: 200,
            height: 150,
            resizeMode: 'contain'
        }} source={{
            uri: 'https://i.ibb.co/G9JvdwD/Banco-Pichincha-logo-svg.png'
        }} />
      </View>
      <Text style={{
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
      }}>TRANSFERENCIA</Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 16
      }}>Banco Pichinca</Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 16
      }}>Numero de cuenta</Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 16
      }}>Tipo de cuenta</Text>

      <View style={{
        alignItems: 'center',
        marginTop: 40,
        width: '100%'
      }}>
        <TextInput style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
             borderRadius: 5,
             width: '90%',
             height: 50,
             paddingHorizontal: 10,
             marginBottom: 15
        }} placeholder='Numero de documento' />
        <TextInput style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
             borderRadius: 5,
             width: '90%',
             height: 50,
             paddingHorizontal: 10,
             marginBottom: 15
        }} placeholder='Fecha de la transferencia' />
         <TextInput style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
             borderRadius: 5,
             width: '90%',
             height: 50,
             paddingHorizontal: 10,
             marginBottom: 15
        }} placeholder='Direccion' />
        {loading? <ActivityIndicator /> : uploadedUrl?.length ? <Text>Imagen cargada correctamente</Text> : (

        <TouchableOpacity 
            onPress={handleChoosePhoto}
            style={{
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                width: '90%',
                height: 45,
                borderRadius: 5
            }}
        >
            <Text style={{
                textAlign: 'center',
                marginTop: 12,
                color: 'rgba(0,0,0,0.5)'
            }}>Subir imagen de la transferencia</Text>
        </TouchableOpacity>
  
    )}

      </View>
      <TouchableOpacity 
        onPress={sendPayment}
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
            }}>Enviar pago</Text>
        </TouchableOpacity>
    </View>
  )
}

export default TransferMethod
