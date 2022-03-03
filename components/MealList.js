// import React from 'react'
// import { FlatList, StyleSheet, View } from 'react-navigation'
// import MealItem from "./MealItem"


// const MealList = props => {

//     const renderMealItem = itemData => {
//         return(
//             <MealItem 
//             title = {itemData.item.title}
//             image = {itemData.item.imageUrl}
//             onSelectMeal={() => {
//                 props.navigation.navigate({
//             routeName: 'MealDetail',
//             params: {
//               mealId: itemData.item.id
//               }
//             })
//          }}
//             duration={itemData.item.duration}
//             complexity={itemData.item.complexity}
//             affordability={itemData.item.affordability}
//             />
//         )
//     }

//     return(
//         <View style={styles.list}>
//         <Text>The Categories Meal Screen</Text>
//         <FlatList
//             data={props.listData}
//             keyExtractor={(item, index) => item.id}
//             renderItem={renderMealItem}
//             style={{width: "90%"}}
        
//         />
//     </View>
//     )
 
// }

// const styles = StyleSheet.create({
//     list: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });



// export default MealList



import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import mealsReducer from '../store/reducers/meals';

import MealItem from './MealItem';

const MealList = props => {

    // reminder! can only use useSelector in the route component. Can't in nested(renderMealItem)
    // doing this so the star is already filled when go to the detail screen and isn't empty for a second
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)


  const renderMealItem = itemData => {
      const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
      
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
            //   we are setting the title in the component that is rendered before the mealDetailScreen
            // this way the title header is loaded before the click and we immediatly see the title
              mealTitle: itemData.item.title,
              isFav: isFavorite
            }
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
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealList;