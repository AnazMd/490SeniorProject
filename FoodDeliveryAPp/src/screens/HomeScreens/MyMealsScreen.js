import React from "react";
import{useState, useEffect} from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView} from "react-native";
import { MealDetails } from '../../components/MealDetails';

import { auth, db } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
/*import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";*/
let diet = null;


export function MyMealsScreen( {user} ) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(db, `users/${user.uid}`);

    onValue(userRef, (snapshot) => {
      setUserData(snapshot.val());

    });

    //if the app keeps crashing because of "user_preference" whatever, COMMENT OUT THESE 2 LINES BELOW then refresh, then uncomment as the text pops up on this screen
    //console.log('PREF ', userData.user_preference)
    //diet = userData.user_preference;

    //Anaz, here is the issue
    //register a new user and choose vegan or vegetarian
    //then itll show (null)
    //then do ctrl+s on vs code which will refresh the app, now it has the preference u picked
    //idk how to fix it
    if (userData && userData.user_preference) {
      diet = userData.user_preference;
      console.log(diet)
    }  
    

    return () => off(userRef);
  }, [user]);

  // cisco's api key: ccc7636d8ca643b3aeaa0428a3e1efe9
  // Pouria: b932a28a292846c3b80c7bd9475e4577
  //Pouria 2nd code: d1209f9a7f2d4a718c85eab8cc079052
  // Anaz: e095e14b3aba4f8a86d65bbbec9d5258
  // Extra: ad6b49472d7e4267891b4a52dcc07a2c
  const fetchRecipes = () => {
    //cisco's code
    //fetch(`https://api.spoonacular.com/recipes/findByNutrients?number=3&random=true&minCalories=0&apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9`)
    //random sort
    //fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=d1209f9a7f2d4a718c85eab8cc079052&addRecipeNutrition=true&number=3&sort=random&diet=vegan')
    
    
    if (diet == 'Vegan'){
      console.log('VEGAN PREF ', diet)
      fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=d1209f9a7f2d4a718c85eab8cc079052&addRecipeNutrition=true&number=3&sort=random&diet=vegan')
        .then(response => response.json())
        .then(data => {
          //if using cisco fetch then (data) without 'results'
          setRecipes(data.results);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }

    else if (diet == 'Vegetarian'){
      console.log('VEGETARY PREF ', diet)
      fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=d1209f9a7f2d4a718c85eab8cc079052&addRecipeNutrition=true&number=3&sort=random&diet=vegetarian')
        .then(response => response.json())
        .then(data => {
          setRecipes(data.results);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }

    else{

      console.log('NOOOOO PREF ', diet)
      fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=d1209f9a7f2d4a718c85eab8cc079052&addRecipeNutrition=true&number=3&sort=random')
        .then(response => response.json())
        .then(data => {
          setRecipes(data.results);
          setIsLoading(false);
        })
        .catch(error => console.log(error));


    }


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

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const boxWidth = windowWidth * 0.885;
  const boxHeight = windowHeight * 0.25;

  return (
    <SafeAreaView style={{
      flex:1, 
      flexDirection:'column', 
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
    }}>
      <Text style={{ fontSize: Math.min(boxWidth / 6, boxHeight / 6), fontWeight: 'bold', textAlign: 'center' }}>Daily Meals</Text>
      
      {isLoading ? (
        // When loading
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="blue" />
            <Text>Loading...</Text>
        </View>
      ) : (

        // When loaded
        <View style={{ 
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {recipes && recipes.map(recipe => (
            <TouchableOpacity key={recipe.id} onPress={() => setSelectedMeal(recipe.id)} style={{ 
              backgroundColor: "#AD40AF",
              margin: 5,
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 50,
              width: boxWidth, 
              height: boxHeight,
            }}>
                <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                {/* DO NOT REMOVE BELOW, there are there just in case */}
                {/* <Text style={[{fontSize: Math.min(boxWidth / 12, boxHeight / 12), fontWeight: 'bold'}, styles.textInfo]} numberOfLines={2}>{recipe.title}</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Calories: {recipe.calories}kcal</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Fat: {recipe.fat}</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Carbs: {recipe.carbs}</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Protein: {recipe.protein}</Text> */}
                <Text style={[{fontSize: Math.min(boxWidth / 12, boxHeight / 12), fontWeight: 'bold'}, styles.textInfo]} numberOfLines={2}>{recipe.title}</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Calories: {recipe.nutrition.nutrients[0].amount}kcal</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Fat: {recipe.nutrition.nutrients[1].amount}g</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Carbs: {recipe.nutrition.nutrients[3].amount}g</Text>
                <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Protein: {recipe.nutrition.nutrients[8].amount}g</Text>
                {/* <Text>Vegan: {recipe.vegan ? 'Yes' : 'No'}</Text> */}
            </TouchableOpacity>
          ))}


          {selectedMeal && (
            <MealDetails mealId={selectedMeal} closeModal={closeModal} showInstacartButton={true}/>
          )}

        </View>
      )}

      <Button style={{width:'50%', height:'10%'}} title="Generate New Meals" color="blue" onPress={generateMeals}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    color: "white",
  }
})
