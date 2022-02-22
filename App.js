import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';
import React, {useState} from 'react';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from "react-native-screens"

// behind the scenes this unlocks the screens and makes the performace better and more efficient
enableScreens()

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf')

  })
}

 function App() {
  
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={(err) => console.log(err)}/>
  }
  return (
    <MealsNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App