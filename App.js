import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import CardsNavigator from "./navigation/CardsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import cardsReducer from "./store/reducers/cards";
import { Provider } from "react-redux";

// behind the scenes this unlocks the screens and makes the performace better and more efficient
enableScreens();

// creates store and it takes a reducer. we need to merge all single reducers into one using combineReducers
const rootReducer = combineReducers({
  cards: cardsReducer,
});
const store = createStore(rootReducer);

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    // we wrap Provider around the top most components. and had all components that need access to state
    // the store prop allows us to access the store and redux in any component in our app
    <Provider store={store}>
      <CardsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
