import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen"
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// createMaterialBottomTabNavigator allows use to customize that bottom tabs in a better style for android
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const defaultStackNavOptions =  

// pages slide from the bottom instead of deafault popping, only for IOS
// mode: "modal",

//  can use initialRouteName to set the initial route. "Categories" is our default
//  initialRouteName: "Categories"

// allow us to set up options that apply to every screen in the navigator
// now we don't have to repeat the code in every screen
// defaultNavOpts get merged with the specific navOptions in a components
// the sepecif navOptions will always override the defaultNavOption is the same name, or key, is found in both
{defaultNavigationOptions: {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  // styles title headerTint
  headerTintColor:
    Platform.OS === "android" ? "white" : Colors.primaryColor,
},
}

// first argument is your screen object and the second argument configures the navigator
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },

    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
   
);

 const FavNavigator = createStackNavigator({
  Favorties: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
  // our first tab is rendering the navigation stack of screens
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      // tabBarIcon is a function that gets passed an argument automatically by react native
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      // only works if shifting: true
      tabBarColor: Colors.primaryColor
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!",

      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-star"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.accentColor
    },
  },
}

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: "white",
      // shifting gives a nice ripple effect when clicking tab buttons
      shifting: true,
      // we can use barStyle to to set the tab color if we don't want to use shifting: true. 
      // barStyle: {
      //   backgroundColor: Colors.primaryColor
      // }
    })
    : createBottomTabNavigator( tabScreenConfig,
        
        {
          // tabBarOptions allows us to control how tab is styled.
          tabBarOptions: {
            activeTintColor: Colors.accentColor,
          },
        }
      );

      const FiltersNavigator = createStackNavigator({
        Filters: FiltersScreen
      })

      const MainNavigator = createDrawerNavigator({
        MealsFavs: MealsFavTabNavigator,
        Filters: FiltersNavigator
      })

// we can use MealsFavTabNavgator because or MealsNavigator we use in the header is nested inside
export default createAppContainer(MainNavigator);
