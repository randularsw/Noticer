import React, { Component } from "react";
import firebase from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "galio-framework";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";

class Profile extends Component {
  state = {
    user: {},
    workplace: {},
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUser(user?.uid);
      }
    });
  }

  getUser(uid) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          this.setState({ user: data });
          this.getWorkplace(data.workplaceId);
        }
      });
  }

  getWorkplace(id) {
    firebase
      .firestore()
      .collection("workplaces")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        this.setState({ workplace: data });
      });
  }

  onLogout() {
    firebase.auth().signOut();
    this.props.navigation.navigate("Home");
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
              {this.state.user?.type == "admin" && (
                <View style={[styles.content, styles.row]}>
                  <Text size={20}>{this.state.workplace?.workplaceName}</Text>
                  <Text
                    // size={12}
                    muted
                    style={{ marginTop: 4, marginLeft: 10 }}
                  >
                    Admin
                  </Text>
                </View>
              )}
              <View style={[styles.content, { marginTop: 50 }]}>
                <Text size={12} muted>
                  FullName
                </Text>
                <Text size={16}>{this.state.user?.name}</Text>
                <Text size={12} style={{ marginTop: 30 }} muted>
                  Email
                </Text>
                <Text size={16}>{this.state.user?.email}</Text>
                <Button
                  style={{ marginTop: 30 }}
                  round
                  size="small"
                  color="red"
                  onPress={() => this.onLogout()}
                >
                  Logout
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Profile {...props} navigation={navigation} />;
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
    width: "80%",
    // marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
