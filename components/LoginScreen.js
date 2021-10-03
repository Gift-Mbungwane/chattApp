import React, { useEffect } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { globalStyles } from "./styles/global";
import globalUserModel from "./Model";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "./database/firebase";

const image = require("../assets/Signin.jpg");

export default function LoginScreen({ navigation }) {
  const login = () => {
    //try {
    auth
      .signInWithEmailAndPassword(
        globalUserModel.email,
        globalUserModel.password
      )
      .then(() => {
        navigation.replace("DashboardScreen");
      })
      .catch((error) => {
        erroMessage = error.message;
        alert(erroMessage);
      });
  };
  /*
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("ChatScreen");
      } else {
        navigation.canGoBack() && navigation.popToTop();
        //No User is Sign-In
      }
    });
    return unsubscribe;
  }, []);
*/
  return (
    <View
      style={{
        padding: 24,
        marginTop: 100,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
