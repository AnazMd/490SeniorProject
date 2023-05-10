import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Button, ActivityIndicator, StyleSheet, Dimensions, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { MealDetails } from '../../components/MealDetails';
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";

import { useNavigation } from '@react-navigation/native';

let calories_x = null
let recipe_id = null;
let title_x = null;
let protein_x = null;
let carb_x = null;
let fat_x = null;
let image_x = null;



export function Search( {navigation} ){
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // const navigation = useNavigation();

  //Cisco, the logic is right here
  const handleButtonPress = () => {
    const title = `some title ${recipe_id}`; // replace with the current text information
    navigation.navigate('Favorites', {recipe_id, calories_x, title_x, protein_x, image_x, carb_x, fat_x });
    console.log('PRESSED')
  };

  const openModal = (id, calories, title, protein, carb, fat, image) => {
    // console.log('HERES ID', id)
    recipe_id = id
    calories_x = calories
    title_x = title
    protein_x = protein
    image_x = image
    carb_x = carb
    fat_x = fat

    setModalVisible(true);
  };

  const shutModal = () => {
    setModalVisible(false);
  };

  const handleAndShut = () => {
    shutModal()
    handleButtonPress()
  }
 
  {/*}
  const handleSearch = (query) => {
    setIsLoading(true);
    fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeNutrition=true&instructionsRequired=true&number=3&query=${query}&apiKey=e095e14b3aba4f8a86d65bbbec9d5258`)
      .then((response) => response.json())
      .then((data) => {
      setSearchResults(data.results))
      console.log(setSearchResults);
  }
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
*/}
  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchClicked(true);
    fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeNutrition=true&instructionsRequired=true&number=5&query=${query}&apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ results }) => {
        setSearchResults(results);
        console.log(setSearchResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setIsLoading(false));
  };

  const nutrientsofInterest = ["Calories", "Fat", "Carbohydrates", "Protein"];

  if (Array.isArray(searchResults) && searchResults.length > 0) {
    searchResults.forEach((recipe) => {
      let nutrientAmounts = {};
      recipe.nutrition.nutrients.forEach((nutrient) => {
        if (nutrientsofInterest.includes(nutrient.name)) {
          if (!nutrientAmounts.hasOwnProperty(nutrient.name)) {
            nutrientAmounts[nutrient.name] = nutrient.amount;
          } else {
            nutrientAmounts[nutrient.name] += nutrient.amount;
          }
        }
      });
      recipe.nutrientAmounts = nutrientAmounts;
    });
  }

  const closeModal = () => {
    setSelectedMeal(null);
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const boxWidth = windowWidth * 0.885; //prev value was 0.885
  const boxHeight = windowHeight * 0.29; //prev value was 0.2425

  return (
    // Added scrolling feature
    
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for Meals"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <Button title="Search" onPress={() => handleSearch(query)} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll_container}>
        <View style={styles.resultLayout}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="blue" />
              <Text>Loading...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <View style={styles.boxLayout}>
              {searchResults && searchResults.map((recipe, index) => (
                <TouchableOpacity
                  key={recipe.id}
                  onPress={() => setSelectedMeal(recipe.id)}
                  style={[styles.boxes, {width: boxWidth, height: boxHeight}]}
                >
                  <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                  <Text style={[{fontSize: 18, fontWeight: 'bold'}, styles.textInfo]} numberOfLines={2}>{recipe.title}</Text>
                  <Text style={[{fontSize: 16}, styles.textInfo]}>Calories: {recipe.nutrientAmounts["Calories"]} kcal</Text>
                  <Text style={[{fontSize: 16}, styles.textInfo]}>Fat: {recipe.nutrientAmounts["Fat"]} g</Text>
                  <Text style={[{fontSize: 16}, styles.textInfo]}>Carbs: {recipe.nutrientAmounts["Carbohydrates"]} g</Text>
                  <Text style={[{fontSize: 16}, styles.textInfo]}>Protein: {recipe.nutrientAmounts["Protein"]} g</Text>
                  {/* a popup to replace the meals */}
                  {/* PASS IN SPECIFIC RECIPE ID FOR **FAVORITES.JS** */}
                  <TouchableWithoutFeedback onPress={() => openModal(recipe.id, recipe.nutrientAmounts["Calories"], recipe.title, recipe.nutrientAmounts["Protein"], recipe.nutrientAmounts["Carbohydrates"],
                  recipe.nutrientAmounts["Fat"], recipe.image)}>
                    <Text style={[{fontSize: 18, color: "#00FFFF"}]}>Favorite Meal</Text>
                  </TouchableWithoutFeedback>
                  {/* Below is the Modal */}
                  
                  {console.log(`Recipe ${index + 1}: ${recipe.title}`)}
                </TouchableOpacity>
              ))}

              {selectedMeal && (
                <MealDetails mealId={selectedMeal} closeModal={closeModal} showInstacartButton={false}/>
              )}
            </View>
          ) : (
            <View style={styles.loading}>
              {!isLoading && !searchClicked &&<Text style={styles.searchPrompts}>Meals will be displayed here.</Text>}
              {!isLoading && searchClicked &&<Text style={styles.searchPrompts}>No Results.</Text>}
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} onRequestClose={shutModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Click to Favorite Meal Below</Text>
            <Button title="Favorite" color={"#00FFFF"} onPress={handleAndShut}/>
            <Button title="Cancel" color={"#00FFFF"} onPress={shutModal} />
          </View>
        </View>
      </Modal>
      {/* Below is a BACKUP modal, DO NOT REMOVE */}
        {/* <Modal visible={modalVisible} onRequestClose={shutModal}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Modal Content Goes Here</Text>
            <TouchableOpacity onPress={shutModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  //Stuff for the Modal popup
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    height: "20%",
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white",
  },
  // Regarding the SCREEN SHAKE when you scroll up, it is because some of the stuff INSIDE THE SCROLLVIEW is too large to render
  // Thus, to fix that, increase the minHeight if necessary
  scroll_container: {
    // Meals will be displayed here text and no result text will look centered
    minHeight: '80%',
  },
  page: {
    flex:1, 
    flexDirection:'column', 
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16, 
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "80%",
  },
  resultLayout: {
    flex: 1, 
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  boxLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxes: {
      backgroundColor: '#AD40AF',
      marginVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
  },
  textInfo: {
    color: "white",
  },
  searchPrompts: {
    fontSize: 20,
    color: "#AD40AF"
  }
});
