import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/cards";

const FilterSwtich = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      {/* Switch needs to be handled by state.. value property takes in a boolean if it's checked or not check.. 
            the onValue takes a function that fires whenever user clicks switch*/}
      <Switch
        value={props.state}
        onValueChange={props.onChange}
        //  trackColor changes color of switch when set to true
        trackColor={{ true: Colors.primaryColor }}
        //   thumbColor is the ball in the switch
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  // we are using destructuring so the the useEffect does rerun whenever props changes.. only when navigation changes
  const { navigation } = props;

  const [isCreature, setIsCreature] = useState(false);
  const [isSorcery, setIsSorcery] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const [isArtifact, setIsArtifact] = useState(false);

  const dispatch = useDispatch();
  // we use useCallback because this info is now cached by react and only updated if its dependencies change
  //
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      creature: isCreature,
      sorcery: isSorcery,
      instant: isInstant,
      artifact: isArtifact,
    };
    dispatch(setFilters(appliedFilters));
    // we will re create this function only if one of these dependencies is updated
    // this is import becuase saveFilters is a dependency in useEffect and we want to keep the rerendering to a minimum
  }, [isCreature, isSorcery, isInstant, isArtifact, dispatch]);

  useEffect(() => {
    // setParams updates the params values of the currently loaded screen

    navigation.setParams({ save: saveFilters });
    // The effect calls innerFunction, hence it should declare it as a dependency
    // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available FIlters / Restrictions</Text>
      <FilterSwtich
        label="Creature"
        state={isCreature}
        onChange={(newValue) => setIsCreature(newValue)}
      />
      <FilterSwtich
        label="Sorcery"
        state={isSorcery}
        onChange={(newValue) => setIsSorcery(newValue)}
      />
      <FilterSwtich
        label="Instant"
        state={isInstant}
        onChange={(newValue) => setIsInstant(newValue)}
      />
      <FilterSwtich
        label="Artifact"
        state={isArtifact}
        onChange={(newValue) => setIsArtifact(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Cards",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          // We need data from our component in our navigation
          // This is how we communicate between component and nav options
          // we call the getParam method getting the key of "save" from our useEffect
          onPress={() => {
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    margin: 20,
    fontSize: 22,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // align items on cross axis so it's centered vertically
    alignItems: "center",
    width: "80%",
    marginVertical: 50,
  },
});

export default FiltersScreen;
