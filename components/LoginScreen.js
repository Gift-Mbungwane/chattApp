import React, { useEffect } from "react";
import {
  ImageBackground,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { globalStyles } from "./styles/global";
import globalUserModel from "./Model";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./database/firebase";

const image = require("../assets/Signin.jpg");

export default function LoginScreen({ navigation }) {
  const login = () => {
    auth
      .signInWithEmailAndPassword(
        globalUserModel.email,
        globalUserModel.password
      )
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        navigation.navigate("ChatScreen");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        padding: 24,
        marginTop: 100,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Input
            multiline
            placeholder="email@address.com"
            label="Your Email address"
            leftIcon={<MaterialIcons name="email" size={24} color="black" />}
            value={globalUserModel.email}
            onChangeText={(email) => globalUserModel.setEmail(email)}
          />

          <Input
            multiline
            placeholder="Password"
            label="Password"
            leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
            value={globalUserModel.password}
            onChangeText={(password) => globalUserModel.setPassword(password)}
            secureTextEntry
          />
          <View style={globalStyles.button}>
            <Button title="sign in" onPress={login} />
          </View>
          <View style={globalStyles.button}>
            <Button
              title="register"
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
