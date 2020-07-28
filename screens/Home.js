import React, { Component } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Text, Input, Icon } from "galio-framework";
import { useNavigation } from "@react-navigation/native";

class Home extends Component {
  state = {
    ref: "",
  };

  async onJoin() {
    firebase
      .firestore()
      .collection("workplaces")
      .where("ref", "==", this.state.ref)
      .get()
      .then((snapshot) => {
        if (snapshot.size == 1) {
          const workplaces = [];
          snapshot.forEach((d) => {
            const data = d.data();
            data.id = d.id;
            workplaces.push(data);
          });
          this.props.navigation.navigate("Join", {
            workplace: workplaces[0],
          });
        }
        return false;
      });
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.innerContainer}>
              <Image
                style={styles.middleImage}
                resizeMode="contain"
                source={require("../assets/art.png")}
              />
              <Text muted size={13} style={{ marginTop: 20 }}>
                Join a Workplace
              </Text>
              <View style={styles.row}>
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Reference Code"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ ref: text });
                  }}
                />
                <Button
                  round
                  size="small"
                  color="red"
                  onPress={() => this.onJoin()}
                >
                  Join
                </Button>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Add Workplace")}
                style={[styles.content, { marginTop: 20 }]}
              >
                <>
                  <Text>Add Your Workplace</Text>
                  <Text color="grey" size={13}>
                    Share work related Notices with your Employees easily.
                  </Text>
                </>
              </TouchableOpacity>
              <Text size={13} muted style={{ marginTop: 50 }}>
                Already a User?
              </Text>
              <Button
                round
                size="small"
                color="red"
                onPress={() => this.props.navigation.navigate("Login")}
              >
                Login
              </Button>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Home {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    height: "90%",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    borderRadius: 20,
    paddingVertical: 20,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
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
    width: "90%",
    marginTop: 15,
    backgroundColor: "#dbdbdb",
    borderRadius: 20,
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  middleImage: { width: 250, height: 200 },
});
