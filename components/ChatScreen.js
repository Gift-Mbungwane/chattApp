import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "./styles/global";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  auth,
  db,
  messageCollection,
  userCollection,
} from "./database/firebase";
import { Avatar } from "react-native-elements";
import globalUserModel from "./Model";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const fb = require("../components/database/firebase.js");

export default function ChatScreen({ route, navigation }) {
 
  const state = {
    userName: "",
  }

  return (
    <View style={{flex: 1, backgroundColor : "#fff"}}>
        <Text>hello</Text>
    </View>
  );

}