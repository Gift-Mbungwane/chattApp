import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { db } from "./database/firebase";
import globalUserModel from "./Model";
import { globalStyles } from "./styles/global";

export default function ChatlistScreen({ user, navigation }) {
  const getUser = async () => {
    try {
      const querySnap = await db
        .collection("users")
        .where("uid", "!=", globalUserModel.uid)
        .get();
      const Users = querySnap.docs.map((docSnap) => docSnap.data());

      globalUserModel.setUsers(Users);
    } catch (rror) {
      const errormessage = rror.message;
      alert(rror);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={globalUserModel.users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={navigation.navigate("ChatScreen", {
              userName: users.params.userName,
            })}
          >
            <View style={globalStyles.userInfo}>
              <View style={globalStyles.userImageWrapper}>
                <Image style={globalStyles.userImage} source={item.userImg} />
              </View>
              <View style={globalStyles.textSection}>
                <View style={globalStyles.userInfoText}>
                  <View style={globalStyles.userName}></View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
