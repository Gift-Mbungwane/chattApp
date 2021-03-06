import React, { useCallback, useEffect, useLayoutEffect } from "react";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./components/SignupScreen";
import LoginScreen from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";
import { auth } from "./components/database/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalUserModel from "./components/Model";
import { Alert, View } from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import DashboardScreen from "./components/DashboardScreen";
import { ListItem } from "react-native-elements/dist/list/ListItem";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        alert("You have been logged out successfully");
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        const errorM = error.message;
        alert(errorM);
      });
  };

  useEffect(() => {
    // logOut();
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
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            title: "",
            headerRight: () => (
              <TouchableOpacity onPress={logOut()}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="#2e64e5"
                  style={{
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                    right: 0,
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: globalUserModel.userName,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
