import React from "react";
import{useState, useEffect} from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { MealDetails } from '../../components/MealDetails';
/*import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";*/

export function MyMealsScreen() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // cisco's api key: ccc7636d8ca643b3aeaa0428a3e1efe9
  // Pouria: b932a28a292846c3b80c7bd9475e4577
  // Anaz: e095e14b3aba4f8a86d65bbbec9d5258
  // Extra: ad6b49472d7e4267891b4a52dcc07a2c
  const fetchRecipes = () => {
    fetch(`https://api.spoonacular.com/recipes/findByNutrients?number=3&random=true&minCalories=0&apiKey=e095e14b3aba4f8a86d65bbbec9d5258`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const generateMeals = () => {
    setIsLoading(true);
    fetchRecipes();
  }

  const closeModal = () => {
    setSelectedMeal(null);
  };

  // Define the colors object
  const colors = {
  primary: "006aff",
  };

  return (
    <SafeAreaView style={{
      flex:1, 
      flexDirection:'column', 
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
    }}>
      <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>Daily Meals</Text>
      
      {isLoading ? (
        // When loading
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={100} color={colors.primary} />
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        </View>
      ) : (

        // When loaded
        <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
          {recipes && recipes.map(recipe => (
            <TouchableOpacity key={recipe.id} onPress={() => setSelectedMeal(recipe.id)} style={{ 
              backgroundColor: "hsl(136, 92%, 55%)",
              flex: 0.295,
              aspectRatio: 1.8,
              marginHorizontal: 8,
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 50,
            }}>
                <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                <Text>{recipe.title}</Text>
                <Text>Calories: {recipe.calories}kcal</Text>
                <Text>Fat: {recipe.fat}</Text>
                <Text>Carbs: {recipe.carbs}</Text>
                <Text>Protein: {recipe.protein}</Text>
            </TouchableOpacity>
          ))}  

          {selectedMeal && (
            <MealDetails mealId={selectedMeal} closeModal={closeModal}/>
          )}

        </View>
      )}

      <Button style={{width:'50%', height:'10%'}} title="Generate New Meals" color="blue" onPress={generateMeals}></Button>
    </SafeAreaView>
  );
}