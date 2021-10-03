import React, { useState } from "react";
import { realtimedb } from "./database/firebase";

export const Users = async (userName, email, photo, uid) => {
  try {
    return await realtimedb.ref("users/" + uid).set({
      userName: userName,
      email: email,
      photo: photo,
      uuid: uid,
    });
  } catch (error) {
    const errorMess = error.message;
    alert(errorMess);
  }
};

///export const allUsers = async () => {};

export const [allUsers, setAllUsers] = useState(null);
