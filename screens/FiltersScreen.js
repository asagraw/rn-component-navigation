import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useDispatch} from 'react-redux';

import HeaderButton_ from "../components/HeaderButton";
import Colors from "../constants/Colors";
import {setFilters} from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <Switch
          trackColor={{ true: Colors.primaryColor }}
          thumbColor={Colors.accentColor}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    );
};

const FiltersScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
 
  //useCallBack cache the saveFilter and recreates it only when any dependency changes
  const saveFilters = useCallback(() => {
    const appliedFilters = {
        glutenFree:isGlutenFree,
        lactoseFree:isLactoseFree,
        vegan:isVegan,
        vegetarian:isVegetarian
    };
    dispatch(setFilters(appliedFilters));
  },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch]);

  useEffect(() => {
      props.navigation.setParams({save:saveFilters});
  },[saveFilters])
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>
      <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={(newValue) => setIsGlutenFree(newValue)}/>
      <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={(newValue) => setIsLactoseFree(newValue)}/>
      <FilterSwitch label='Vegan' state={isVegan} onChange={(newValue) => setIsVegan(newValue)}/>
      <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={(newValue) => setIsVegetarian(newValue)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical:15
  },
  label:{
    fontFamily:'open-sans',
    fontSize:15
  }
});

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter here",
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
    headerRight:(
        <HeaderButtons HeaderButtonComponent={HeaderButton_}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>  
    )
  };
};

export default FiltersScreen;
