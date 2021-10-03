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
  realtimedb,
} from "./database/firebase";
import { Avatar } from "react-native-elements";
import globalUserModel from "./Model";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const fb = require("../components/database/firebase.js");

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  // const { userName, photoURL } = route.params;

  const SendMessage = async (currentUid, guestUid, message) => {
    try {
      return await realtimedb
        .ref("messages/" + currentUid)
        .child(guestUid)
        .push({
          currentUid: currentUid,
          guestUid: guestUid,
          message: message,
        });
    } catch (error) {
      const errorMess = error.message;
      alert(errorMess);
    }

    if (message) {
      SendMessage(currentUid, guestUid, messages)
        .then(() => {
          setMessages(messages);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  const ReceiveMessage = async (currentUid, guestUid, message) => {
    try {
      return await realtimedb
        .ref("messages/" + guestUid)
        .child(currentUid)
        .push({
          currentUid: currentUid,
          guestUid: guestUid,
          message: message,
        });
    } catch (error) {
      const errorMess = error.message;
      alert(errorMess);
    }
    if (message) {
      ReceiveMessage(currentUid, guestUid, messages)
        .then(() => {
          setMessages(messages);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    const unsub = messageCollection
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe, unsub;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    return db.collection("messages").add({
      _id,
      createdAt,
      text,
      user,
    });
    /* return messageCollection.add({
      uid,
      createAt,
      text,
      user,
    });*/
  });

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
}
