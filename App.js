import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./components/SignupScreen";
import LoginScreen from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
