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

class AddNotice extends Component {
  state = {
    title: "",
    content: "",
    workplaceId: "",
  };
  componentDidMount() {}

  onCreate = async () => {
    // try {
    //   await firebase
    //     .firestore()
    //     .collection("workplaces")
    //     .add({
    //       title: this.state.title,
    //       content: this.state.content,
    //       notices: [],
    //     })
    //     .then((data) => {
    //       const workplaceId = data.id;
    //       this.setState({ workplaceId });
    //     });
    //   this.props.navigation.navigate("Notices");
    // } catch (err) {
    //   console.log(err);
    // }
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
                <Text>Admin</Text>
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Title"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ title: text });
                  }}
                />
                <Input
                  borderless
                  bgColor="#dbdbdb"
                  color="#2e2e2e"
                  placeholder="Content"
                  rounded
                  onChangeText={(text) => {
                    this.setState({ content: text });
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

  return <AddNotice {...props} navigation={navigation} />;
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
