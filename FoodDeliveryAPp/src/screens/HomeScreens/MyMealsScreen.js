import React from "react";
import{useState, useEffect} from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, Image} from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";

export function MyMealsScreen() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch(`https://api.spoonacular.com/recipes/findByNutrients?number=3&random=true&minCalories=0&apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9`)
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const generateMeals = () => {
    fetchRecipes();
    alert('Generating Meals');
  }

  return (
    <SafeAreaView style={{
      flex:1, 
      flexDirection:'column', 
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
    }}>
      <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>Daily Meals</Text>
      
      <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
        {recipes && recipes.map(recipe => (
          <TouchableOpacity key={recipe.id} style={{ 
            backgroundColor: "hsl(136, 92%, 55%)",
            flex: 0.285,
            aspectRatio: 2,
            marginHorizontal: 8,
            alignItems: 'center', 
            justifyContent: 'center',
          }}>
              <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100 }} />
              <Text>{recipe.title}</Text>
              <Text>Calories: {recipe.calories}kcal</Text>
              <Text>Fat: {recipe.fat}</Text>
              <Text>Carbs: {recipe.carbs}</Text>
              <Text>Protein: {recipe.protein}</Text>
          </TouchableOpacity>
        ))}  
      </View>
      <Button style={{width:'50%', height:'10%'}} title="Generate New Meals" color="blue" onPress={generateMeals}></Button>
    </SafeAreaView>
  );
}