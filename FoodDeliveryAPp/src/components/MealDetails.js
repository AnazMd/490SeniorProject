import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, Image, ActivityIndicator, Modal, FlatList, StyleSheet } from "react-native";

export function MealDetails({ mealId, closeModal/*, setSelectedMeal*/ }) {
  const [details, setDetails] = useState(null);
  const [instructions, setInstructions] = useState(null);

  // fetch image and ingredients
  const fetchIngredients = (mealId) => {
    fetch(`https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=true&apiKey=b932a28a292846c3b80c7bd9475e4577`)
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
      fetch(`https://api.spoonacular.com/recipes/${mealId}/analyzedInstructions?apiKey=b932a28a292846c3b80c7bd9475e4577`)
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
    return <ActivityIndicator size="large" color="blue" />
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
            <Button title="Close" color="blue" onPress={handleModalClose} />
            <Text style={[{fontSize: 34}, styles.modalText]}>{details.title}</Text>
            <Image source={{ uri: details.image} } style={{ width: 150, height: 150, borderRadius: 10 }} />
            
            <Text style={[{fontSize: 24}, styles.modalText]}>Ingredients: </Text>
            <FlatList
              data={details.extendedIngredients}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <Text style={[{fontSize: 16}, styles.modalText]}>-{item.original}</Text>}
            />

            <Text/>

            <Text style={[{fontSize: 24}, styles.modalText]}>Instructions: </Text>
            {instructions && instructions[0] && instructions[0].steps && (
              <FlatList
                data={instructions[0].steps}
                keyExtractor={(i) => i.number}
                renderItem={({ item }) => <Text style={[{fontSize: 16}, styles.modalText]}>-{item.step}</Text>}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "68%",
  },
  modalText: {
    color: "white",
  },
  flatList: {
    backgroundColor: "white"
  },
});