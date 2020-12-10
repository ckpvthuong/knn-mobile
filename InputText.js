import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const host = "http://192.168.1.125:5000";

export default function inputText({ navigation }){
  const [result, setResult] = useState("");
  const [text, setText] = useState("");

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
    textDecorationLine: "underline",
  },
  result: {
    marginTop: 40,
    color: "red",
    alignSelf: "center",
    fontSize: 32,
  },
});