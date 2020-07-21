// In App.js in a new project

import * as React from "react";
import firebase from "./firebase";
import { View, YellowBox, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import AddWorkplace from "./screens/AddWorkplace";
import Notices from "./screens/Notices";
import { Button, Text, Input } from "galio-framework";
import Login from "./screens/Login";

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    user: {},
  };
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);

    firebase.auth().onAuthStateChanged((user) => {
      this.getUser(user.uid);
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
          this.setState({ user: snapshot.data() });
        }
      });
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add Workplace" component={AddWorkplace} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen
              name="Notices"
              component={Notices}
              options={{
                headerRight: () => (
                  <View styles={{ paddingRight: 10 }}>
                    <Text onPress={() => alert("This is a button!")}>
                      {this.state.user?.name}
                    </Text>
                  </View>
                ),
                headerRightContainerStyle: {
                  paddingRight: 15,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
