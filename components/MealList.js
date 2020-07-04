import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = (props) => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFavMeal = favMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        item={itemData.item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetails",
            params: {
              mealId: itemData.item.id,
              mealTitle:itemData.item.title,
              isFav:isFavMeal
            },
          });
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={styles.fList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  fList: {
    width: "95%",
    marginTop: 5,
  },
});

export default MealList;
