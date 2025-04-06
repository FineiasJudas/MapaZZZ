import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import mudar_camera from '../../assets/mudar-camera.png'
import foto from '../../assets/foto.png'
import bom from '../../assets/bom.png'
import mal from '../../assets/mal.png'
import out from '../../assets/out.png'
import repeat from '../../assets/repeat.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'
import { style } from '../login/style'

export default function App ({navigation}: any) {
  {/* posicao da camera */}
  const [facing, setFacing] = useState<CameraType>('back')
   {/* pegar foto para preview */}
  const [photo, setPhoto] = useState<string | null>(null)
   {/* lazy Loading para quando o usuário decidir cadastrar uma zona de perigo */}
  const [loading, setLoading] = useState(false)
   {/* permissao da camera */}
  const [permission, requestPermission] = useCameraPermissions()
  const [galleryPermission, requestGalleryPermission] =
    MediaLibrary.usePermissions()
  const cameraRef = useRef<any>(null)

  useEffect(() => {
    // verificar se o usuário tem permissão para estar nessa tela
    const checkPermission = async () => {
      const token = await AsyncStorage.getItem('Token')
      if (!token) {
        Alert.alert('Erro', 'Você não tem permissão para acessar essa tela')
        // Redirecionar para a tela de login
        navigation.navigate('Login');
        return
      }
    }
    checkPermission()
  }, []);



  // Verificar e solicitar permissões da galeria
  if (!galleryPermission) {
    requestGalleryPermission()
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <Button onPress={requestPermission} title='Conceder permissão' />
      </View>
    )
  }
  {/* Troca de posicao da camera */}
  function toggleCameraFacing () {
    setFacing(current => (current === 'back' ? 'front' : 'back'))
  }

  // Função para tirar foto
  async function takePicture () {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync()
      setPhoto(photoData.uri)
    }
  }
  // Função para descartar a foto
  function discardPhoto () {
    setPhoto(null)
  }

  // Função para salvar a foto na galeria
  async function saveToGallery () {
    if (photo) {
      try {
        await MediaLibrary.createAssetAsync(photo)
        Alert.alert('Sucesso', 'Foto salva na galeria!')
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar a foto.')
      }
    }
  }

  // Função para registrar a zona de perigo
  async function RegisterDangerZone () {
    // pegar a latitude e longitude exata do local que o telefone está
    setLoading(true)
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão de localização negada.')

      return
    }
    if (!photo) return
    const data = new FormData()
    data.append('file', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg'
    } as any)
    data.append('upload_preset', 'mapazzz') // Defina seu upload_preset no Cloudinary

    try {
      let response = await fetch(
        'https://api.cloudinary.com/v1_1/da8q1jhdf/image/upload',
        {
          method: 'POST',
          body: data
        }
      )

      let result = await response.json()
      if (response.ok) {
        // Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
        const token = await AsyncStorage.getItem('Token')
        try {
          const location = await Location.getCurrentPositionAsync({})
          const latitude = location.coords.latitude
          const longitude = location.coords.longitude
          let responseApi = await fetch(
            'https://mapazzz.onrender.com/api/danger_zone/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                lat: latitude,
                lon: longitude,
                image: result.secure_url
              })
            }
          )
          let responseData = await responseApi.json()

          if (responseApi.ok) {
            Alert.alert('Sucesso', 'Zona de perigo registrada com sucesso!')
            setPhoto(null)
            setLoading(false)
            navigation.navigate('MapaPage')
          } else {
            Alert.alert('Erro', responseData.message)
            setLoading(false)
            console.log('Erro ao enviar a imagem:', responseData)
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível salvar a imagem na galeria.')
          setLoading(false)
        }
      } else {
        Alert.alert('Erro', 'Falha ao enviar a imagem.')
        setLoading(false)
      }
    } catch (error) {
      // Alert.alert('Erro', 'Falha ao enviar a imagem para o Cloudinary.');
      Alert.alert('Error', 'Falha a reportar a zona de risco!')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }



  return (
    <View style={styles.container}>
      {!photo && (
        <TouchableOpacity
          style={styles.topLeftLogo}
          onPress={() => navigation.navigate('reportPage')}
        >
          <Image source={out} style={styles.out}  />
          <TouchableOpacity onPress={toggleCameraFacing}>

          <Image  source={repeat} style={styles.changeCamera}  />
          
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {photo ? (
        <>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#7F1734" />
              <Text style={styles.message}>Aguarde um pouco...</Text>
              {/* <Text style={styles.message}>Carregando...</Text> */}
            </View>
          ) : (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo }} style={styles.previewImage} />
              <View style={styles.buttonContainer}>
                <View style={styles.buttonContainerchild}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={discardPhoto}
                  >
                    <Image source={mal} style={styles.descarte} />
                  </TouchableOpacity>
                  {/* <Button title="Salvar na Galeria" onPress={saveToGallery} color="red" /> */}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={RegisterDangerZone}
                  >
                    <Image source={bom} style={styles.report} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Image source={foto} style={styles.btnFoto} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descarte: {
    padding: 10,
    width: 45,
    height: 45,
    fontSize: 20,
    fontWeight: 'bold'
  },
  report: {
    padding: 10,
    width: 40,
    height: 40,
    fontSize: 20,
    fontWeight: 'bold'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 30,
    width: '100%'
  },
  buttonContainerchild: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center'
  },
  topLeftLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    gap: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 50,
    top: 40,
    zIndex: 1
  },
  out: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  changeCamera: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  btnFoto: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  previewContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImage: {
    flex: 1,
    // marginTop: 70,
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
})
