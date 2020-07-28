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

class Join extends Component {
  state = {
    workplace: {},
    name: "",
    email: "",
    password: "",
    workplaceId: "",
  };
  componentDidMount() {
    const { workplace } = this.props.route.params;
    this.setState({ workplace });
  }

  onJoin = async () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (userData) => {
          if (userData) {
            let userRef = await firebase
              .firestore()
              .collection("users")
              .doc(userData.user.uid);
            userRef.set({
              name: this.state.name,
              email: this.state.email,
              type: "user",
              workplaceId: this.state.workplace.id,
            });
            this.props.navigation.navigate("Notices");
          }
        });
    } catch (err) {
      console.log(err);
    }
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
                <Text muted>Join</Text>
                <Text size={20}>{this.state.workplace?.workplaceName}</Text>
              </View>
              <View style={[styles.content, { marginTop: 50 }]}>
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Full Name"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ name: text });
                  }}
                />
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Email Address"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                />
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Password"
                  rounded
                  password
                  viewPass
                  onChangeText={(text) => {
                    this.setState({ password: text });
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
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <Join {...props} navigation={navigation} />;
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
