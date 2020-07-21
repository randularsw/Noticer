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

const Stack = createStackNavigator();

function App() {
  YellowBox.ignoreWarnings(["Setting a timer"]);

  // firebase.auth().onAuthStateChanged((user) => {
  //   console.log(user ? user.providerData : "No User App");
  // });

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Add Workplace" component={AddWorkplace} />
          <Stack.Screen
            name="Notices"
            component={Notices}
            options={{
              headerRight: () => (
                <View styles={{ paddingRight: 10 }}>
                  <Text onPress={() => alert("This is a button!")}>Name </Text>
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
