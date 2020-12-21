import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  // Picker
} from "react-native";
// import ScrollPicker from 'react-native-wheel-scroll-picker';
// import SmoothPicker from 'react-native-smooth-picker';
import {Picker} from '@react-native-picker/picker';

const host = "http://192.168.1.4:5000";

export default function inputText({ navigation }){
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [k, setK] = useState("");

  const getResultFromServer = () => {
    Keyboard.dismiss()
    console.log("Text input: ",text);
    return fetch(`${host}/textjson`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      })
    })
      .then((response) => response.json())
      .then((res) => handleRes(res.result))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRes = (res)=>{
    console.log("res",res);
    setResult(res)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder="Enter text to predict..."
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        
        <Picker
          selectedValue={k}
          // style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            setK(itemValue)
          }>
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
          <Picker.Item label="13" value="13" />
          <Picker.Item label="14" value="14" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="16" value="16" />
        </Picker>

        <View style={styles.buttonSubmit}>
          <Button onPress={getResultFromServer} title="Submit" color="white" />
        </View>

        <Text style={styles.resultLabel}>Result</Text>
        <Text style={styles.result}>{result}</Text>

        <Button
        title="Nhập file dạng File"
        onPress={() => navigation.navigate('file')}
        />
      </View>

    </TouchableWithoutFeedback>
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
  },
  result: {
    marginTop: 40,
    color: "red",
    alignSelf: "center",
    fontSize: 32,
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  pickerItem: {
    color: 'red'
  },
});