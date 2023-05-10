import React from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native";
import{useState, useEffect} from "react";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { useRoute } from '@react-navigation/native';
import { MealDetails } from '../../components/MealDetails';


export function Favorites(){

    const route = useRoute();
    const id = route.params?.recipe_id || '';
    const title = route.params?.title_x || '';
    const image = route.params?.image_x || '';
    const protein = route.params?.protein_x || '';
    const carb = route.params?.carb_x || '';
    const fat = route.params?.fat_x || '';
    const calories = route.params?.calories_x || '';

    const [selectedMeal, setSelectedMeal] = useState(null);

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const boxWidth = windowWidth * 0.885; //prev value was 0.885
    const boxHeight = windowHeight * 0.29; //prev value was 0.2425

    const closeModal = () => {
      setSelectedMeal(null);
    };

    // Maybe add an option to "clear all" ids
    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.boxLayout}>
          <TouchableOpacity
            key={id}
            onPress={() => setSelectedMeal(id)}
            style={[styles.boxes, {width: boxWidth, height: boxHeight}]}
          >
            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <Text style={[{fontSize: 18, fontWeight: 'bold'}, styles.textInfo]} numberOfLines={2}>{title}</Text>
            <Text style={[{fontSize: 16}, styles.textInfo]}>Calories: {calories} kcal</Text>
            <Text style={[{fontSize: 16}, styles.textInfo]}>Fat: {fat} g</Text>
            <Text style={[{fontSize: 16}, styles.textInfo]}>Carbs: {carb} g</Text>
            <Text style={[{fontSize: 16}, styles.textInfo]}>Protein: {protein} g</Text>
          </TouchableOpacity>
          
          {selectedMeal && (
            <MealDetails mealId={selectedMeal} closeModal={closeModal} showInstacartButton={true}/>
          )}

        </View>
      </SafeAreaView>
    );
    
}   

const styles = StyleSheet.create({
  page: {
    flex:1, 
    flexDirection:'column', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
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
  }
});