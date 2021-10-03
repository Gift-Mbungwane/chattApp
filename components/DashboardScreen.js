import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, realtimedb, db } from "./database/firebase";
import globalUserModel from "./Model";

export default function DashboardScreen({ navigation }) {
  const [allUsers, setAllUsers] = useState(null);
  const [user, SetUser] = useState(null);

  const getData = async () => {
    const query = await db
      .collection("users")
      .where("uid", "!=", auth?.currentUser?.uid)
      .get();
    const users = query.docs.map((documentSnap) => documentSnap.data());
    //console.log(users);
    //setAllUsers(users);
    setAllUsers(users);

    const queryUser = await db
      .collection("users")
      .where("uid", "==", auth?.currentUser?.uid)
      .get();
    const User = queryUser.docs.map((document) => document.data());
    SetUser(User);
    //auth.onAuthStateChanged(() => {})
    const url = await ref.getDownloadURL();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <ScrollView
        style={{ padding: 20 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={allUsers}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{ height: 150, width: 150, borderRadius: 75 }}
          source={{ uri: auth?.currentUser?.photoURL }}
        />
        <Text>{auth?.currentUser?.email}</Text>
        <FlatList
          data={allUsers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity item={item}>
                <View
                  style={{
                    marginTop: 20,
                    borderRadius: 8,
                    backgroundColor: "#FFF",
                    height: 80,
                    width: 330,
                    flexDirection: "row-reverse",
                  }}
                >
                  <Image
                    style={{
                      justifyContent: "flex-end",
                      borderRadius: 40,
                      height: 70,
                      width: 70,
                      padding: 5,
                      marginTop: 5,
                      marginHorizontal: 40,
                    }}
                    source={{ uri: item.photoURL }}
                  />
                  <Text
                    style={{
                      justifyContent: "flex-start",
                      padding: 24,
                      fontSize: 20,
                      marginHorizontal: 100,
                    }}
                  >
                    {item.userName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
