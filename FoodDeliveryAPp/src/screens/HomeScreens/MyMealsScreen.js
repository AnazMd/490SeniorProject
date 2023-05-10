// import React from "react";
// import { useState, useEffect } from "react";
// import {
//   View,
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Button,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import { MealDetails } from "../../components/MealDetails";

// /*import { colors, parameters, title } from "../../constants/styles";
// import { Icon } from "react-native-elements/dist/icons/Icon";
// import { SCREEN_NAMES } from "../../constants/navigation";
// import { Screen } from "../../components/layout/Screen";*/

// export function MyMealsScreen({ userData }) {
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [recipes, setRecipes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchRecipes = (diet) => {
//     // cisco's api key: ccc7636d8ca643b3aeaa0428a3e1efe9
//     // Pouria: b932a28a292846c3b80c7bd9475e4577
//     //Pouria 2nd code: d1209f9a7f2d4a718c85eab8cc079052
//     // Anaz: e095e14b3aba4f8a86d65bbbec9d5258
//     // Extra: ad6b49472d7e4267891b4a52dcc07a2c
//     let apiUrl;
//     let apiKey = "d1209f9a7f2d4a718c85eab8cc079052";
//     if (diet === "Vegan" || diet === "Vegetarian") {
//       //confirming it works
//       //console.log(diet, userData.user_weight)

//       apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=3&sort=random&diet=${diet}`;
//     } else {
//       apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=3&sort=random`;
//     }

//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         setRecipes(data.results);
//         setIsLoading(false);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     if (userData && userData.user_preference) {
//       setIsLoading(true);
//       fetchRecipes(userData.user_preference);
//     }
//   }, [userData]);

//   const generateMeals = () => {
//     setIsLoading(true);
//     fetchRecipes(userData && userData.user_preference);
//   };

//   const closeModal = () => {
//     setSelectedMeal(null);
//   };

//   const windowWidth = Dimensions.get("window").width;
//   const windowHeight = Dimensions.get("window").height;
//   const boxWidth = windowWidth * 0.885;
//   const boxHeight = windowHeight * 0.25;

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "space-around",
//         paddingHorizontal: 16,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: Math.min(boxWidth / 6, boxHeight / 6),
//           fontWeight: "bold",
//           textAlign: "center",
//         }}
//       >
//         Daily Meals
//       </Text>

//       {isLoading ? (
//         // When loading
//         <View
//           style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//         >
//           <ActivityIndicator size="large" color="blue" />
//           <Text>Loading...</Text>
//         </View>
//       ) : (
//         // When loaded
//         <View
//           style={{
//             flexDirection: "row",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {recipes &&
//             recipes.map((recipe) => (
//               <TouchableOpacity
//                 key={recipe.id}
//                 onPress={() => setSelectedMeal(recipe.id)}
//                 style={{
//                   backgroundColor: "#AD40AF",
//                   margin: 5,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 50,
//                   width: boxWidth,
//                   height: boxHeight,
//                 }}
//               >
//                 <Image
//                   source={{ uri: recipe.image }}
//                   style={{ width: 100, height: 100, borderRadius: 10 }}
//                 />
//                 {/* DO NOT REMOVE BELOW, there are there just in case */}
//                 {/* <Text style={[{fontSize: Math.min(boxWidth / 12, boxHeight / 12), fontWeight: 'bold'}, styles.textInfo]} numberOfLines={2}>{recipe.title}</Text>
//                 <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Calories: {recipe.calories}kcal</Text>
//                 <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Fat: {recipe.fat}</Text>
//                 <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Carbs: {recipe.carbs}</Text>
//                 <Text style={[{fontSize: Math.min(boxWidth / 14, boxHeight / 14)}, styles.textInfo]}>Protein: {recipe.protein}</Text> */}
//                 <Text
//                   style={[
//                     {
//                       fontSize: Math.min(boxWidth / 12, boxHeight / 12),
//                       fontWeight: "bold",
//                     },
//                     styles.textInfo,
//                   ]}
//                   numberOfLines={2}
//                 >
//                   {recipe.title}
//                 </Text>
//                 <Text
//                   style={[
//                     { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
//                     styles.textInfo,
//                   ]}
//                 >
//                   Calories: {recipe.nutrition.nutrients[0].amount}kcal
//                 </Text>
//                 <Text
//                   style={[
//                     { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
//                     styles.textInfo,
//                   ]}
//                 >
//                   Fat: {recipe.nutrition.nutrients[1].amount}g
//                 </Text>
//                 <Text
//                   style={[
//                     { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
//                     styles.textInfo,
//                   ]}
//                 >
//                   Carbs: {recipe.nutrition.nutrients[3].amount}g
//                 </Text>
//                 <Text
//                   style={[
//                     { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
//                     styles.textInfo,
//                   ]}
//                 >
//                   Protein: {recipe.nutrition.nutrients[8].amount}g
//                 </Text>
//                 {/* <Text>Vegan: {recipe.vegan ? 'Yes' : 'No'}</Text> */}
//               </TouchableOpacity>
//             ))}

//           {selectedMeal && (
//             <MealDetails
//               mealId={selectedMeal}
//               closeModal={closeModal}
//               showInstacartButton={true}
//             />
//           )}
//         </View>
//       )}

//       <Button
//         style={{ width: "50%", height: "10%" }}
//         title="Generate New Meals"
//         color="blue"
//         onPress={generateMeals}
//       ></Button>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   textInfo: {
//     color: "white",
//   },
// });

import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { MealDetails } from "../../components/MealDetails";

/*import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";*/

export function MyMealsScreen({ userData }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = (diet, age, weight, height, goal) => {
    let agex = parseInt(age);
    let weightx = parseInt(weight);
    let heightx = parseInt(height);

    console.log(diet);
    console.log("HEIGHT ", heightx);
    console.log("WEIGHT, ", weightx);
    console.log("GOAL ", goal);
    console.log("AGE ", agex);

    //conversions
    let calories = null;

    if (goal == "Cut") {
      calories =
        (65 + 6.2 * weightx + 12.7 * heightx - 6.8 * agex) * 1.2 * 0.83;
      console.log("CUT CALS ", calories);
    } else if (goal == "Bulk") {
      calories =
        (65 + 6.2 * weightx + 12.7 * heightx - 6.8 * agex) * 1.2 * 1.15;
      console.log("BULK CALS ", calories);
    } else {
      calories = (65 + 6.2 * weightx + 12.7 * heightx - 6.8 * agex) * 1.2;
      console.log("CALS ", calories);
    }

    // cisco's api key: ccc7636d8ca643b3aeaa0428a3e1efe9
    // Pouria: b932a28a292846c3b80c7bd9475e4577
    //Pouria 2nd code: d1209f9a7f2d4a718c85eab8cc079052
    // Anaz: e095e14b3aba4f8a86d65bbbec9d5258
    // Extra: ad6b49472d7e4267891b4a52dcc07a2c
    let apiUrl;
    let apiKey = "b932a28a292846c3b80c7bd9475e4577";

    apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&targetCalories=${calories}&timeFrame=day&diet=${diet}`;

    /*if (diet === "Vegan" || diet === "Vegetarian") {
      
      //confirming it works
      //console.log(diet, userData.user_weight)
      apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=3&sort=random&diet=${diet}`;
    
    } else {
      apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=3&sort=random`;
    }*/

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);

        const meals = data.meals;
        const mealPromises = meals.map((meal) => {
          // fetch for macronutrients of each recipe
          return fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/nutritionWidget.json?apiKey=${apiKey}`
          ).then((response) => response.json());
        });

        const recipePromises = meals.map((meal) => {
          // fetch for image
          return fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?includeNutrition=false&apiKey=${apiKey}`
          ).then((response) => response.json());
        });

        Promise.all([...mealPromises, ...recipePromises]).then((data) => {
          const nutritionData = data.slice(0, meals.length);
          const recipeData = data.slice(meals.length);

          console.log("nutritionData:", nutritionData);
          console.log("recipeData:", recipeData);

          const combinedData = meals.map((meal, index) => {
            return {
              ...meal,
              calories: nutritionData[index].calories,
              carbs: nutritionData[index].carbs,
              fat: nutritionData[index].fat,
              protein: nutritionData[index].protein,
              title: recipeData[index].title,
              image: recipeData[index].image,
            };
          });

          setRecipes(combinedData);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (
      userData &&
      userData.user_preference &&
      userData.user_age &&
      userData.user_weight &&
      userData.user_height &&
      userData.user_goal
    ) {
      setIsLoading(true);
      fetchRecipes(
        userData.user_preference,
        userData.user_age,
        userData.user_weight,
        userData.user_height,
        userData.user_goal
      );
    }
    //if (userData && userData.user_preference) {Statements above go in here}
  }, [userData]);
  const generateMeals = () => {
    if (
      userData &&
      userData.user_preference &&
      userData.user_age &&
      userData.user_weight &&
      userData.user_height &&
      userData.user_goal
    ) {
      setIsLoading(true);
      fetchRecipes(
        userData.user_preference,
        userData.user_age,
        userData.user_weight,
        userData.user_height,
        userData.user_goal
      );
    }
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const boxWidth = windowWidth * 0.885;
  const boxHeight = windowHeight * 0.25;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: Math.min(boxWidth / 6, boxHeight / 6),
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Daily Meals
      </Text>

      {isLoading ? (
        // When loading
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading...</Text>
        </View>
      ) : (
        // When loaded
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {recipes &&
            recipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                onPress={() => setSelectedMeal(recipe.id)}
                style={{
                  backgroundColor: "#AD40AF",
                  margin: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  width: boxWidth,
                  height: boxHeight,
                }}
              >
                <Image
                  source={{ uri: recipe.image }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                {/* DO NOT REMOVE BELOW, there are there just in case */}
                <Text
                  style={[
                    {
                      fontSize: Math.min(boxWidth / 12, boxHeight / 12),
                      fontWeight: "bold",
                    },
                    styles.textInfo,
                  ]}
                  numberOfLines={2}
                >
                  {recipe.title}
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Calories: {recipe.calories}kcal
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Fat: {recipe.fat}
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Carbs: {recipe.carbs}
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Protein: {recipe.protein}
                </Text>
                {/*<Text
                  style={[
                    {
                      fontSize: Math.min(boxWidth / 12, boxHeight / 12),
                      fontWeight: "bold",
                    },
                    styles.textInfo,
                  ]}
                  numberOfLines={2}
                >
                  {recipe.title}
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Calories: {recipe.nutrition.nutrients[0].amount}kcal
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Fat: {recipe.nutrition.nutrients[1].amount}g
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Carbs: {recipe.nutrition.nutrients[3].amount}g
                </Text>
                <Text
                  style={[
                    { fontSize: Math.min(boxWidth / 14, boxHeight / 14) },
                    styles.textInfo,
                  ]}
                >
                  Protein: {recipe.nutrition.nutrients[8].amount}g
                </Text>
                {/* <Text>Vegan: {recipe.vegan ? 'Yes' : 'No'}</Text> */}
              </TouchableOpacity>
            ))}

          {selectedMeal && (
            <MealDetails
              mealId={selectedMeal}
              closeModal={closeModal}
              showInstacartButton={true}
            />
          )}
        </View>
      )}

      <Button
        style={{ width: "50%", height: "10%" }}
        title="Generate New Meals"
        color="blue"
        onPress={generateMeals}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    color: "white",
  },
});
