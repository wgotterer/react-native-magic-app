import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native'
import { ScreenContainer } from 'react-native-screens'



const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  // checks to see if it's android and version is compatible to add ripple effect
  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  }

    return(
      <View style={styles.gridItem}>
        <TouchableCmp  style={{flex: 1}}  onPress={props.onSelect} >
        <View style={{...styles.container, ...{backgroundColor: props.color}}}>
          {/*numberOfLines used so that if anything is longer it goes to a new lone  */}
          <Text style={styles.title} numberOfLines={2} >{props.title} </Text>
        </View>
      </TouchableCmp>
      </View>
    )
}

const styles = StyleSheet.create({
  gridItem: {
    // flex:1 fills up the entire screen
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    // using Platform becuase can't see shadow with overflow : "hidden". can see on android becuase of elevation
    // on ios overflow isn't needed becuase we are using touchableOpacity where as android needs it for controlling ripple effect
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    //  elevation for android becuase the shadow only effects ios
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    padding: 15,
    // flexbox is top to bottom in RN so flex end will put it on the bottom
    justifyContent: "flex-end",
    // alignItems is set to flex-end to move it to the right on
    // horizontal axis or cross axis which is left to right
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    // android was putting it on the left so used texAlign: right
    textAlign: "right",
  },
});

export default CategoryGridTile
