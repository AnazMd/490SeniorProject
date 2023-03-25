import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, Image, ActivityIndicator, Modal, FlatList, StyleSheet } from "react-native";

export function MealDetails({ mealId, closeModal/*, setSelectedMeal*/ }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=true&apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  }, [mealId]);

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
            <Text>Servings: {details.servings}</Text>
            <Text>Ingredients: </Text>
            <FlatList
              data={details.extendedIngredients}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <Text>{item.original}</Text>}
            />
            <Text>Instructions: {details.summary}</Text>
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
    width: "90%",
    height: "90%",
  },
});