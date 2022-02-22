import React from 'react'
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import Colors from '../constants/Colors'
import MealItem from '../components/MealItem'

const CategoryMealsScreen = props => {

    const renderMealItem = itemData => {
        return(
            <MealItem 
            title = {itemData.item.title}
            image = {itemData.item.imageUrl}
            onSelectMeal={() => {
                props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id
              }
            })
         }}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            />
        )
    }

    const catId = props.navigation.getParam('categoryId');

    // Looking to see if the array of categrories is present using indexOf. 
    // Checking to see if it's greater than 0 because indexOf will return -1 if not found
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0 )


  

    return(
        <View style={styles.screen}>
            <Text>The Categories Meal Screen</Text>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: "90%"}}
            
            />
        </View>
        
    )
}

// have it as a function that depends on changing data/ dynamic.
// By default navigation gives us the title as the title as back text if there is space
// when calling the navigationOptions method on the function we get props and 
// in the prop we can access navigation object that has the getParam method
CategoryMealsScreen.navigationOptions = (navigationData) => {
    
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return{
        headerTitle: selectedCategory.title,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default CategoryMealsScreen