import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, Image, ActivityIndicator, Modal, FlatList, StyleSheet } from "react-native";

export function MealDetails({ mealId, closeModal/*, setSelectedMeal*/ }) {
  const [details, setDetails] = useState(null);
  const [instructions, setInstructions] = useState(null);

  // fetch image and ingredients
  const fetchIngredients = (mealId) => {
    fetch(`https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=true&apiKey=e095e14b3aba4f8a86d65bbbec9d5258`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        console.log('details:', data);
      });
  };
  // Immediately called when file opens
  useEffect(() => {
    fetchIngredients(mealId);
  }, []);

  useEffect(() => {
    const fetchInstructions = (mealId) => {
      fetch(`https://api.spoonacular.com/recipes/${mealId}/analyzedInstructions?apiKey=e095e14b3aba4f8a86d65bbbec9d5258`)
        .then(response => response.json())
        .then(data => {
          setInstructions(data);
          console.log('instructions:', instructions);
        });
    };

    fetchInstructions(mealId);
  }, []);

  const [modalVisible, setModalVisible] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
    closeModal();
  };

  if (!details) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      > 
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Close" onPress={handleModalClose} />
            <Text>{details.title}</Text>
            <Image source={{ uri: details.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            
            <Text>Ingredients: </Text>
            <FlatList
              data={details.extendedIngredients}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <Text>{item.original}</Text>}
            />

            <Text/>

            <Text>Instructions: </Text>
            {instructions && instructions[0] && instructions[0].steps && (
              <FlatList
                data={instructions[0].steps}
                keyExtractor={(i) => i.number}
                renderItem={({ item }) => <Text>{item.step}</Text>}
              />
            )}

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "68%",
  },
});