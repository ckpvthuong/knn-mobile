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

const host = "https://fd233650-2199-4bf5-8aec-f95f5c0b336f.mock.pstmn.io";

export default function App() {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");

  const getResultFromServer = () => {
    console.log(text);
    return fetch(`${host}/text`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text_input: text,
      }),
    })
      .then((response) => response.json())
      .then((res) => setResult(res.result))
      .catch((error) => {
        console.error(error);
      });
  };

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
