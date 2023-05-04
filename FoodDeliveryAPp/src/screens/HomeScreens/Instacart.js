import React, {usestate, useContext} from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { IngredientsContext } from '../../components/IngredientsContext';

export function Instacart () {
  const { ingredients, clearIngredients } = useContext(IngredientsContext);

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    clearIngredients(updatedIngredients);
  };

  const handleClearIngredients = () => {
    clearIngredients([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Instacart Tab</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ingredients.map((ingredient, index) => (
          <TouchableOpacity style={styles.ingredientsContainer}>
              <Text key={index} style={styles.ingredient}>
                {ingredient}
              </Text> 
              <Button title="Remove" color="#00FFFF" onPress={() => handleRemoveIngredient(index)}></Button>   
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Remove All Ingredients" color="blue" onPress={handleClearIngredients} /> 
      </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientsContainer: {
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#AD40AF',
    width: '100%',
  },
  ingredient: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    padding: 10,
  },
});