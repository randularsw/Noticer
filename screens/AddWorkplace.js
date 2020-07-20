import React, { Component } from "react";
import firebase from "../firebase";
import { Button, Input } from "galio-framework";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

export default AddWorkplace = ({ navigation }) => {
  const handleClick = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword("qrrrtrrr@kkktk.com", "1234567890")
      .then(async (userData) => {
        if (userData) {
          let userRef = await firebase
            .firestore()
            .collection("users")
            .doc(userData.user.uid);
          userRef.set({ name: "reaper", email: userData.user.email });
        }
      });
  };

  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Input
            borderless
            bgColor="#dbdbdb"
            color="#2e2e2e"
            placeholder="Workplace Name"
            rounded
          />
          <Button round size="small" color="red">
            Create
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  image: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
