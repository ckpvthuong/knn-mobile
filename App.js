import React, { useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InputFile from './InputFile';
import InputText from './InputText';

const host = "http://192.168.1.125:5000";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="text" component={InputText} options={{ title: 'Nhập dạng text' }}/>
        <Stack.Screen name="file" component={InputFile} options={{ title: 'Nhập dạng file' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
