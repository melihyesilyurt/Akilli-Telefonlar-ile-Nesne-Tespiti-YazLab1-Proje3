import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
var genislik = 0;
var uzunluk = 0;
const App = () => {
  const [image, setImage] = useState('http://34.71.38.29:3000/upload/img.jpg');
  console.log("rerender");
  function uploadImage(image) {
    console.log('received image');
    genislik = image.width;
    uzunluk = image.height;
    fetch('http://34.71.38.29:3000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: image.data,
        width: image.width,
        height: image.height
      }),
    })
      .then((response) => {
        console.log("cevap aldik");
        setImage('http://34.71.38.29:3000/upload/img.jpg' + '?' + Date.now());
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      includeBase64: true,
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(uploadImage)
      .catch((e) => alert(e));
  }

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(uploadImage)
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  const renderAsset = (image) => {
    return renderImage(image);
  }

  const renderImage = (image) => {
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={image}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />
      <TouchableOpacity
        onPress={() => pickSingleWithCamera(true)}
        style={styles.button}
      >
        <Text style={styles.text}>
          Select Single Photo From Camera
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickSingle(false)}
        style={styles.button}
      >
        <Text style={styles.text}>Select Single Photo From Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default App;
