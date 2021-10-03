import React, { useEffect } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { globalStyles } from "./styles/global";
import globalUserModel from "./Model";
import { Input, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import {
  auth,
  db,
  firebaseApp,
  userCollection,
  realtimedb,
  storage,
} from "./database/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const image = require("../assets/Signin.jpg");
const fb = require("../components/database/firebase.js");

export default function SignupScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      globalUserModel.setPhoto(result.uri);
    }
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(
        globalUserModel.email,
        globalUserModel.password
      )
      .then((userCredential) => {
        // Signed in
        alert("You have been successfully registered");
        const user = userCredential.user;
        user
          .updateProfile({
            userName: globalUserModel.userName,
            email: globalUserModel.email,
            photoURL: globalUserModel.photo
              ? globalUserModel.photo
              : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffindicons.com%2Fsearch%2Favatar&psig=AOvVaw1sEiZj4FJSN9RhgnlAWSrl&ust=1632779417317000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKDOlcbPnfMCFQAAAAAdAAAAABAD",
          })
          .then(() => {
            return db.collection("users").doc(user.uid).set({
              uid: user.uid,
              userName: globalUserModel.userName,
              email: user.email,
              photoURL: globalUserModel.photo,
            });
            // ...
          })
          .then(() => {
            return realtimedb.ref("/users" + user.uid).set({
              userName: globalUserModel.userName,
              email: globalUserModel.email,
              photo: globalUserModel.photo,
              uuid: user.uid,
            });
          })
          .then(() => {
            // return storage.ref("images/" + user.uid).put
          })
          .catch((error) => {
            errorMeassage = error.message;
            alert(errorMeassage);
          });
        navigation.popToTop();
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {
    async () => {
      if (register) {
        const userId = userCredential.user.id;
        const userData = {
          userName: globalUserModel.userName,
          email: globalUserModel.email,
          photoURL: globalUserModel.photo,
          uid: userCredential.user.id,
        };
        fb.userCollection
          .doc(userId)
          .set(userData)
          .then(() => {
            console.log("user has been successfully added to database");
          });
        realtimedb
          .ref("/users" + userId)
          .set(userData)
          .then(() => {
            console.log("successfully added to real time db");
          });
        storage
          .ref("/images" + userId)
          .getDownloadURL(userData.photoURL)
          .then(() => {
            console.log("image loaded successfully");
          });
      }
    };
  }, []);

  return (
    <View
      style={{
        padding: 24,
        marginTop: 10,
        ImageBackground: require("../assets/Home.jpg"),
      }}
      scrollToBottom
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Input
            multiline
            placeholder="Enter your name"
            label="Name"
            leftIcon={<AntDesign name="user" size={24} color="black" />}
            value={globalUserModel.userName}
            onChangeText={(name) => globalUserModel.setName(name)}
          />

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
            <Button
              multiline
              placeholder="upload image"
              label="Image"
              title={<Feather name="upload" size={24} color="black" />}
              value={globalUserModel.photo}
              onChangeText={(photo) => globalUserModel.setPhoto(photo)}
              onPress={pickImage}
            />
          </View>
          <View style={globalStyles.button}>
            <Button
              title="sign in"
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            />
          </View>
          <View style={globalStyles.button}>
            <Button title="register" onPress={register} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
