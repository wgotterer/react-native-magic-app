import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from "../constants/Colors"
import CategoryGridTile from '../components/CategoryGridTile'


const CategoriesScreen = props => {

    

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
            color={itemData.item.color}
            title={itemData.item.title}
            onSelect={() => {
                props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
              }
            })
         }}
      />
        )
    }
    
    return(
        // numColumns gives us a grid
         <FlatList
            keyExtractor={(item, index) => item.title}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    )
}

CategoriesScreen.navigationOptions = {
    headerTitle: "Meal Categories",
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    
})

export default CategoriesScreen