import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./components/SignupScreen";
import LoginScreen from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";
import { auth } from "./components/database/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalUserModel from "./components/Model";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ChatlistScreen from "./components/ChatlistScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const myOptions = {
    headerShown: false,

    headerRight: () => {
      <TouchableOpacity
        style={{
          marginRight: 30,
        }}
        onPress={() =>
          auth
            .signOut()
            .then(() => {
              navigation.replace("LoginScreen");
            })
            .catch((error) => {
              const errormessage = error.message;
              alert(errormessage);
            })
        }
      >
        <AntDesign name="logout" size={24} color="#2e64e5" />
      </TouchableOpacity>;
    },
  };

  useEffect(() => {
    const deregister = auth.onAuthStateChanged((exist) => {
      if (exist) {
        globalUserModel.setUsers(exist);
      } else {
        globalUserModel.setUsers("");
      }
    });
    return () => {
      deregister();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {globalUserModel.users ? (
          <>
            <>
              {(props) => (
                <ChatlistScreen {...props} user={globalUserModel.users} component={ChatlistScreen} />
              )}
            </>
            <Stack.Screen
              name="ChatScreen"
              options={({ route }) => ({ title: route.params.userName })}
            >
              {(props) => (
                <ChatScreen {...props} user={globalUserModel.users} component={ChatScreen} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ChatlistScreen" component={ChatlistScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
