import React from "react";
import * as firebase from "firebase";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Button, Text, Input } from "galio-framework";

export default function Home({ navigation }) {
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <View style={styles.container}>
        <Image
          style={styles.middleImage}
          resizeMode="contain"
          source={require("../assets/art.png")}
        />
        <View style={styles.row}>
          <Button round size="small" color="red">
            Register
          </Button>
          <Button round size="small" color="red">
            Login
          </Button>
        </View>
        <View style={styles.content}>
          <Text
            style={styles.topLink}
            size={15}
            color="red"
            onPress={() => navigation.navigate("Add Workplace")}
          >
            Add Workplace
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

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
  middleImage: { width: 250, height: 200 },
  topLink: {
    position: "absolute",
    // top: 10,
    // right: 25,
  },
});
