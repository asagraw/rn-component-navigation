import React, {useEffect, useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton_ from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../store/actions/meals';

console.disableYellowBox = true;
const ListItem = props => {
  return <View style={styles.listItem}>
    <DefaultText>{props.children}</DefaultText>
  </View>
}
const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const currMealIsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  const availableMeals = useSelector(state => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  },[dispatch,mealId]);

  // useEffect(() => {
  //   props.navigation.setParams({mealTitle: selectedMeal.title});
  // },[selectedMeal])
  useEffect(() => {
    props.navigation.setParams({toggleMeal: toggleFavHandler});
  },[toggleFavHandler]);

  useEffect(()=>{
    props.navigation.setParams({isFav:currMealIsFav});
  },[currMealIsFav]);
  
  return (
    <ScrollView>
      <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient =>(
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step =>(
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const title = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleMeal");
  const currMealIsFav = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton_}>
        <Item
          title="Favorite"
          iconName= {currMealIsFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:200
  },
  details:{
    flexDirection: 'row',
    padding:15,
    justifyContent:'space-around'
  },
  title:{
    fontFamily:'open-sans-bold',
    fontSize:22,
    textAlign:'center'
  },
  listItem:{
    marginVertical:10,
    marginHorizontal:20,
    borderColor:'#ccc',
    borderWidth:1,
    padding: 10
  }
});

export default MealDetailScreen;
