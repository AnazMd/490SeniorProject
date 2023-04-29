import React, {usestate, useContext} from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { IngredientsContext } from '../../components/IngredientsContext';

export function Instacart () {
  const { ingredients, clearIngredients } = useContext(IngredientsContext);

  const handleClearIngredients = () => {
    clearIngredients([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Instacart Tab</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.ingredientsContainer}>
          {ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              {ingredient}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Clear Ingredients" color="blue" onPress={handleClearIngredients} /> 
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 10,
  },
});