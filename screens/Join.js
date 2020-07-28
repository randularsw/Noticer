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
    workplaceName: "",
    name: "",
    email: "",
    password: "",
    workplaceId: "",
    ref: "",
  };
  componentDidMount() {
    const { ref } = this.props.route.params;
    this.setState({ ref });
    // console.log(this.props.route.params.id);
  }

  setRef() {
    const ref = "WP" + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.setState({ ref });
  }

  onCreate = async () => {
    try {
      await firebase
        .firestore()
        .collection("workplaces")
        .add({
          workplaceName: this.state.workplaceName,
          ref: this.state.ref,
          notices: [],
        })
        .then((data) => {
          const workplaceId = data.id;
          this.setState({ workplaceId });
        });
      await firebase
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
              type: "admin",
              workplaceId: this.state.workplaceId,
            });
          }
        });
      this.props.navigation.navigate("Notices");
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
                <Text>Workplace</Text>
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Workplace Name"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ workplaceName: text });
                  }}
                />
              </View>
              <View style={[styles.content, { marginTop: 50 }]}>
                <Text>Admin</Text>
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
                  onPress={() => this.onCreate()}
                >
                  Create
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
