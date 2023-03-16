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

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>Daily Meals</Text>
      <View>
        {recipes && recipes.map(recipe => (
          <View key={recipe.id}>
            <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100 }} />
            <Text>{recipe.title}</Text>
            <Text>Calories: {recipe.calories}kcal</Text>
            <Text>Fat: {recipe.fat}</Text>
            <Text>Carbs: {recipe.carbs}</Text>
            <Text>Protein: {recipe.protein}</Text>
          </View>
        ))}
      </View>
      <Button title="Generate New Meals" onPress={fetchRecipes} />
    </SafeAreaView>  
  );
  /*

            <TouchableOpacity style={{backgroundColor: "dodgerblue", width: '80%', height: '30%', 
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "gold", width: '80%', height: '30%',
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "orange", width: '80%', height: '30%',
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 3</Text>
            </TouchableOpacity>
            {/*<Text>No Meals to Display</Text>*
            <Button style={{width:'50%', height:'10%'}} title="Generate New Meals" color="blue" onPress={()=> alert('Generating Meals')}></Button>
          </SafeAreaView>
    );*/
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red"
    }
})