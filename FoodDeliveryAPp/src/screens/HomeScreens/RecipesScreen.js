import React from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import{useState, useEffect} from "react";

import { auth, db } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";

import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";

let diet = null;


export function RecipesScreen({ user }) {

    const [recipes, setRecipes] = useState([]);
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(db, `users/${user.uid}`);

    onValue(userRef, (snapshot) => {
      setUserData(snapshot.val());

    });

    //if the app keeps crashing because of "user_preference" whatever, COMMENT OUT THESE 2 LINES BELOW then refresh, then uncomment as the text pops up on this screen
    //console.log('PREF ', userData.user_preference)
    //diet = userData.user_preference;

    return () => off(userRef);
  }, [user]);

  useEffect(() => {
      const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.spoonacular.com/recipes/complexSearch?apiKey=d1209f9a7f2d4a718c85eab8cc079052&addRecipeNutrition=true&diet=vegan'
        );
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // if (diet == 'Vegetarian'){
    //     console.log('VEGETARIAN ',diet);
    //     fetch(
    //         'https://api.spoonacular.com/recipes/complexSearch?apiKey=b932a28a292846c3b80c7bd9475e4577&addRecipeNutrition=true&diet=vegetarian'
    //       )
    //       .then((response) => response.json())
    //       .then((data) => {
    //     //I did ctrl+f on console and typed in "vegan" to see if "vegan:true", it works
    //     console.log('VEGAN STUFF LOG ', data);
    //     setRecipes(data.results);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

    // else if (diet == 'vegan'){
    //     console.log('VEGAN  ',diet);
    //     fetch(
    //         'https://api.spoonacular.com/recipes/complexSearch?apiKey=b932a28a292846c3b80c7bd9475e4577&addRecipeNutrition=true&diet=vegan'
    //       )
    //       .then((response) => response.json())
    //   .then((data) => {
    //     //I did ctrl+f on console and typed in "vegan" to see if "vegan:true", it works
    //     console.log('VEGAN STUFF LOG ', data);
    //     setRecipes(data.results);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

    // else {
    //     fetch(
    //     'https://api.spoonacular.com/recipes/complexSearch?apiKey=b932a28a292846c3b80c7bd9475e4577&addRecipeNutrition=true&diet=vegan'
    //     )
    //     .then((response) => response.json())
    //   .then((data) => {
    //     //I did ctrl+f on console and typed in "vegan" to see if "vegan:true", it works
    //     console.log('VEGAN STUFF LOG ', data);
    //     setRecipes(data.results);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }, []);

 return (
    <SafeAreaView>
      <ScrollView>
        {recipes.map((recipe) => (
          <View key={recipe.id}>
            <Text>Title: {recipe.title}</Text>
            <Text>Protein: {recipe.nutrition.nutrients[8].amount}</Text>
            <Text>Fat: {recipe.nutrition.nutrients[1].amount}</Text>
            <Text>Carb: {recipe.nutrition.nutrients[3].amount}</Text>

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};