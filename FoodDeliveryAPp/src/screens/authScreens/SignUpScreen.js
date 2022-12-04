import React, { useState } from "react";
import { Screen } from "../../components/layout/Screen";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate('FormFillIn', {
          userid: user.uid
        })
        console.log("uid: ", user.uid)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      
  }
  return (
    <Screen>
        <View style={styles.content}>
        <View style = {styles.inputView}>
            <TextInput
                style = {styles.TextInput}
                placeholder="Enter Your Email"
                placeholderTextColor = "003f5c"
                value = {email}
                onChangeText={text => setEmail(text)}
            />
        </View>
        <View style = {styles.inputView}>
            <TextInput
                style = {styles.TextInput}
                placeholder="Enter Your Password"
                placeholderTextColor = "003f5c"
                value = {password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
            <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 10,
      //backgroundColor: "white",
    },
    inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      borderWidth: 1,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "lightgray",
    },
    loginText: {
      color: "white",
      fontSize: "20",
    }
  });