import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import mudar_camera from '../../assets/mudar-camera.png';
import foto from '../../assets/foto.png';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<any>(null);

  // Verificar e solicitar permissões da galeria
  if (!galleryPermission) {
    requestGalleryPermission();
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
    }
  }

  function discardPhoto() {
    setPhoto(null);
  }

  async function saveToGallery() {
    if (photo) {
      try {
        await MediaLibrary.createAssetAsync(photo);
        Alert.alert('Sucesso', 'Foto salva na galeria!');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar a foto.');
      }
    }
  }

  async function uploadToCloudinary() {
    if (!photo) return;

    const data = new FormData();
    data.append('file', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg'
    } as any);
    data.append('upload_preset', 'mapazzz'); // Defina seu upload_preset no Cloudinary

    try {
      let response = await fetch('https://api.cloudinary.com/v1_1/da8q1jhdf/image/upload', {
        method: 'POST',
        body: data
      });

      let result = await response.json();
      if (result.ok) {
        // console.log('Upload bem-sucedido:', result);
        Alert.alert('Upload Concluído', `Imagem enviada: ${result}`);
      }
      else {
        Alert.alert('Erro', result);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar a imagem para o Cloudinary.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftLogo} onPress={toggleCameraFacing}>
        <Image source={mudar_camera} style={styles.smallLogo} />
      </TouchableOpacity>

      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <Button title="Descartar" onPress={discardPhoto} />
            <Button title="Salvar na Galeria" onPress={saveToGallery} color="red" />
            <Button title="Enviar para Cloud" onPress={uploadToCloudinary} color="green" />
          </View>
        </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10
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
  button: {
    alignSelf: 'center'
  },
  topLeftLogo: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 1
  },
  smallLogo: {
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
});
