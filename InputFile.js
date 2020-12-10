import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet, 
  Text, View, 
  TouchableOpacity, 
  Button, Image
} from "react-native";
import {  } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const host = "http://192.168.1.125:5000";

export default function InputFile(){
  const [result, setResult] = useState("");
  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      const data = new FormData();
      data.append('file', result);
      setDocument(data)
  }

  const getResultFromServer = () => {
    return fetch(
      `${host}/filejson`,
      {
        method: 'POST',
        body:document,
        headers: {
        "Content-Type": "multipart/form-data"
        }
      }
    )
    .then((response) => response.json())
    .then((res) => handleRes(res.result))
    .catch((error) => {
      console.error(error);
    });
  }

  const handleRes = (res)=>{
    console.log("res",res);
    setResult(res)
  }

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Select Document"
          onPress={pickDocument}
        />

        <View style={styles.buttonSubmit}>
          <Button onPress={getResultFromServer} title="Submit" color="white" />
        </View>

        <Text style={styles.resultLabel}>Result</Text>
        <Text style={styles.result}>{result}</Text>

      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    marginTop: 50,
    borderWidth: 1,
    marginHorizontal: "5%",
    height: 200,
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    marginHorizontal: "5%",
    borderRadius: 4,
  },
  resultLabel: {
    marginTop: 40,
    color: "green",
    alignSelf: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
  result: {
    marginTop: 40,
    color: "red",
    alignSelf: "center",
    fontSize: 32,
  },
});