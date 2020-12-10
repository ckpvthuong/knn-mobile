import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
//import { DocumentPicker, ImagePicker } from 'expo';
import * as DocumentPicker from 'expo-document-picker';

const host = "http://192.168.1.125:5000";

export default class App extends React.Component {
  state = {
    image: null,
  };
_pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const data = new FormData();
    data.append('file', result);
    console.log(result)
    console.log(data)
    let res =  fetch(
      `${host}/filejson`,
      {
        method: 'POST',
        body:data,
        headers: {
        "Content-Type": "multipart/form-data"
        }
      }
    ) .then((response) => response.json())
    .then((res) => console.log("rs",res.result))
    .catch((error) => {
      console.error(error);
    });
}

 _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  alert(result.uri);
  console.log(result)

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
};

render() {
       let { image } = this.state;
  return (
    <View style={styles.container}>
      <Button
        title="Select Document"
        onPress={this._pickDocument}
      />

    <View style={{ 'marginTop': 20}}>
      <Button
        title="Select Image"
        onPress={this._pickImage}
      />
      {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
