import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "./styles/global";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function ChatScreen({ route }) {
  const [message, setMessages] = useState({});

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setTimeout(
      () =>
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        ),
      0
    );
  }, []);

  const renderBubble = (props) => {
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#2e64e5",
        },
      }}
      textStyle={{
        right: {
          color: "#fff",
        },
      }}
    />;
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialIcons
            name="send"
            size={24}
            color="#2e64e5"
            style={{ marginBottom: 10, marginRight: 10 }}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = (props) => {
    return <FontAwesome name="angle-double-down" size={24} color="#333" />;
  };

  return (
    <GiftedChat
      messages={message}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
}
