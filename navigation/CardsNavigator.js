import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryCardsScreen from "../screens/CategoryCardsScreen";
import CardDetailScreen from "../screens/CardDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import { Platform, Text } from "react-native";
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
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.primaryColor : "white",
      },
      // changes the text in the header
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
      // styles title headerTint
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
    },
  };

// first argument is your screen object and the second argument configures the navigator
const CardsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },

    CategoryCards: {
      screen: CategoryCardsScreen,
    },
    CardDetail: CardDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorties: FavoritesScreen,
    CardDetail: CardDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  // our first tab is rendering the navigation stack of screens
  Cards: {
    screen: CardsNavigator,
    navigationOptions: {
      // tabBarIcon is a function that gets passed an argument automatically by react native
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="folder" size={25} color={tabInfo.tintColor} />;
      },
      // only works if shifting: true
      tabBarColor: Colors.primaryColor,
      // use Text component inside tabBarLabel because MaterialBottomTabNav doesn't support labelStyle like ios bottomTabNav
      // using Platform api to check if it's android becuase we dont want to override the tint and default features in BottomTabNav
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Cards</Text>
        ) : (
          "Cards"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!",

      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};

const CardsFavTabNavigator =
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
    : createBottomTabNavigator(
        tabScreenConfig,

        {
          // tabBarOptions allows us to control how tab is styled.
          tabBarOptions: {
            labelStyle: {
              fontFamily: "open-sans-bold",
            },
            activeTintColor: Colors.accentColor,
          },
        }
      );

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // to override the default lable name could use navoptions in stackNavigtor or drawerNavigator
    // navigationOptions: {
    //   drawerLabel: "Filters!!"
    // },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    CardsFavs: {
      screen: CardsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Cards",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    // contentOptions allows us to control the content in the drawer
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

// we can use MealsFavTabNavgator because or MealsNavigator we use in the header is nested inside
export default createAppContainer(MainNavigator);
