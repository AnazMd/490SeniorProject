import React from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity } from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";

export function ProfileScreen(){
    return (
        <View style={{flex:1, alignItems: 'center', height: 1, marginTop: 15}}>
            {/* <TouchableOpacity > */}
            <View style={styles.CircleShape} /> 
            <Text style={styles.headerText}> Profile</Text>
            {/* </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e5e5e5",
    },
    headerText: {
      fontSize: 20,
      alignItems: "center",
      margin: 10,
      fontWeight: "bold",
      justifyContent: 'center',
      marginRight: 18
    }, 
    CircleShape: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: '#808080',
    },
  
  });

