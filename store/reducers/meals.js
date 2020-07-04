import {TOGGLE_FAVORITE, SET_FILTERS} from '../actions/meals';
import { MEALS } from '../../data/dummy-data';

const initialState = {
    meals:MEALS,
    filteredMeals:MEALS,
    favoriteMeals:[]
};

const mealReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_FAVORITE:
            const favIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(favIndex >= 0){
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(favIndex,1);
                return {...state,favoriteMeals:updatedFavMeals};
            }else{
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return {...state, favoriteMeals:state.favoriteMeals.concat(meal)};
            }
        case SET_FILTERS:
            const apppliedFilters = action.filters;
            const updFilteredMeals = state.meals.filter(meal => {
                if(apppliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                };
                if(apppliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                };
                if(apppliedFilters.vegan && !meal.isVegan){
                    return false;
                };
                if(apppliedFilters.vegetarian && !meal.isVegetarian){
                    return false;
                };
                return true;
            });
            return {...state, filteredMeals:updFilteredMeals};
        default:
            return state;
    }
};

export default mealReducer;