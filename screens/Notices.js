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
  FlatList,
  ToastAndroid,
} from "react-native";
import moment from "moment";

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

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          {/* <ScrollView> */}
          <View style={styles.innerContainer}>
            <View style={styles.content}>
              <FlatList
                data={this.state.workplace?.notices}
                renderItem={({ item }) => (
                  <View
                    style={{
                      alignItems: "flex-start",
                      paddingVertical: 10,
                    }}
                  >
                    <Text size={16} bold>
                      {item.title}
                    </Text>
                    <Text size={13} bold color="gray">
                      {item.content}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text muted size={10}>
                        {moment(item.createdAt).format("MMMM DD , h.mm a")}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.title}
              />
            </View>
            {this.state.user?.type === "admin" && (
              <View
                style={{
                  alignItems: "center",
                  position: "relative",
                  bottom: 45,
                }}
              >
                <Button
                  round
                  size="small"
                  color="red"
                  onPress={() => this.onCreate()}
                >
                  New Notice
                </Button>
              </View>
            )}
          </View>
          {/* </ScrollView> */}
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
    // alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 50,
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
    // width: "80%",
    // marginTop: 15,
    // alignItems: "center",
    // justifyContent: "space-around",
    padding: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
  },
});
