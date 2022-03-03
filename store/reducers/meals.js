import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meals";


// store or slices of store
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      // if the meal in my faveMeals array has the same id as the meal we are doing the action on then we want to remove that from the array
      // if findIdex is false it returns -1
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        // concate makes a new array and adds an item
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
      case SET_FILTERS:
          const appliedFilters = action.filters
          const updatedFilteredMeals = state.meals.filter(meal => {
              if(appliedFilters.glutenFree && !meal.isGlutenFree){
                  return false
              }
              if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                return false
            }
            if(appliedFilters.vegetarian && !meal.isVegetarian){
                return false
            }
            if(appliedFilters.vegan && !meal.isVegan){
                return false
            }
              return true
          })
          return { ...state, filteredMeals: updatedFilteredMeals}
    default:
      return state;
  }
};
export default mealsReducer;

