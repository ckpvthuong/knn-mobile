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
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const host = "http://192.168.98.101:5000";

function inputFile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>input file Screen</Text>
    </View>
  );
}

function inputText({ navigation }){
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="text" component={inputText} options={{ title: 'Nhập dạng text' }}/>
        <Stack.Screen name="file" component={inputFile} options={{ title: 'Nhập dạng file' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
