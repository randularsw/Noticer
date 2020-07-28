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

class Notices extends Component {
  state = {};
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              data.id = snapshot.id;
              // console.log(data);
              this.setState({ user: data });
              this.getWorkplace(data.workplaceId);
            }
          });
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
        data.id = doc.id;
        // console.log(data);
        this.setState({ workplace: data });
      });
  }

  onCreate = () => {
    this.props.navigation.navigate("Add Notice", {
      workplaceId: this.state.workplace?.id,
    });
  };

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
              <View style={styles.content}>
                <Text>Notice 1</Text>
              </View>
              <View style={styles.content}>
                <Text>Admin</Text>
                <Button
                  round
                  size="small"
                  color="red"
                  onPress={() => this.onCreate()}
                >
                  New Notice
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

  return <Notices {...props} navigation={navigation} />;
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
