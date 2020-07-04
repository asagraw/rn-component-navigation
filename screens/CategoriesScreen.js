import React from "react";
import { StyleSheet} from "react-native";
import { FlatList} from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton_ from "../components/HeaderButton";
const CategoriesScreen = (props) => {
  const renderGridItems = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };
  return (
    // <FlatList keyExtractor={(item,index) => item.id} data={CATEGORIES} renderItem={renderGridItems} numColumns={2} />
    <FlatList data={CATEGORIES} renderItem={renderGridItems} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  gridItems: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesScreen;
