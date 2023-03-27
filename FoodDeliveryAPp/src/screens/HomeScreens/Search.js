import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, TextInput} from "react-native";

export function Search(){
    return(

    //Search bar below
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="start typing here to search"
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});
