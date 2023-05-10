import React from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import{useState, useEffect} from "react";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { useRoute } from '@react-navigation/native';



export function Favorites(){

    const route = useRoute();
    const title = route.params?.title_x || '';
    const image = route.params?.image_x || '';
    const protein = route.params?.protein_x || '';
    const carb = route.params?.carb_x || '';
    const fat = route.params?.fat_x || '';

    // Maybe add an option to "clear all" ids
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>

        <Text style={styles.text}>Fat: {fat}g</Text>
        <Text style={styles.text}>Carbs: {carb}g</Text>
        <Text style={styles.text}>Protein: {protein}g</Text>
      </View>
    );
    
}   



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
    },
  });