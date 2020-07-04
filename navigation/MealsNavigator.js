import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesMealsScreen from "../screens/CategoriesMealsScreen";
import MealsDetailScreen from "../screens/MealDetailScreen";
import { createAppContainer } from "react-navigation";
import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FavoritesScreen from "../screens/FavoritesScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from '../screens/FiltersScreen';

const defaultScNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle:{
    fontFamily:'open-sans-bold'
  },
  headerBacktitleStyle:{
    fontFamily:'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};
const MealNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoriesMealsScreen,
    },
    MealDetails: MealsDetailScreen,
  },
  {
    defaultNavigationOptions: defaultScNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultScNavOptions,
  }
);
const tabScreenConfig = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:Platform.OS ==='android' ? <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text> : 'Meals'
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:Platform.OS ==='android' ? <Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text> : 'Favorites'
    },
  },
};
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
        tabBarColor:Colors.accentColor
      });

const FilterNavigator = createStackNavigator({
  Filters:FiltersScreen
},{
  // navigationOptions:{
  //   drawerLabel:'Filters Yay'
  // },
  defaultNavigationOptions: defaultScNavOptions,
});
const MainNavigator = createDrawerNavigator({
  MealsFavs:{
    screen:MealsFavTabNavigator,
    navigationOptions:{
      drawerLabel:'Meals'
    }
  },
  Filters:FilterNavigator
},{
  contentOptions:{
    activeTintColor:Colors.accentColor,
    labelStyle:{
      fontFamily:'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
