import React, { useState, useCallback, useLayoutEffect } from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "./styles/global";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { auth, db } from "./database/firebase";
import { Avatar } from "react-native-elements";
import globalUserModel from "./Model";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ChatScreen({route, navigation }) {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("/messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            createAt: doc.data().createAt,
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.userName,
      headerLeft: () => {
        <View style={{ marginLeft: 30 }}>
          <Avatar
            rounded
            source={{
              uri: globalUserModel.photo,
            }}
          />
        </View>;
      },
      headerRight: () => {
        <TouchableOpacity
          style={{
            marginRight: 30,
          }}
          onPress={signOut}
        >
          <AntDesign name="logout" size={24} color="#2e64e5" />
        </TouchableOpacity>;
      },
    });
  });

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        const errormessage = error.message;
        alert(errormessage);
      });
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { id, createAt, text, user } = messages[0];
    db.collection("messages").doc("messages").add({
      id,
      createAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
      showAvatarForEveryMessage={true}
    />
  );
}
