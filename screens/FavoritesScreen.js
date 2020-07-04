import React from 'react';
import {StyleSheet, View} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import HeaderButton_ from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';


const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    if(!favMeals || favMeals.length === 0){
      return (
        <View style={styles.favEmpty}>
          <DefaultText>No favorites. How about adding some.</DefaultText>
        </View>
      )
    }

    return (
       <MealList listData = {favMeals} navigation={props.navigation}/>
    );
};
FavoritesScreen.navigationOptions = (navData) => {
    return {
      headerTitle: "Your Favorites",
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton_}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
  };
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'open-sans-bold'
    },
    favEmpty:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
})

export default FavoritesScreen;