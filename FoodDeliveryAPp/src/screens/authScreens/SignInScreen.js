import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity } from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Screen } from "../../components/layout/Screen";
import { auth } from "../../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export function SignInScreen({ navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate('Home')
      }
    })
    return unsubscribe;
  }, [])
  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Screen>
      <View style={styles.content}>
        <View >
            <Icon size={80} iconStyle={styles.iconStyle} type = "material" name="restaurant" />
        </View>
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
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={{width: "80%", alignItems:"center", justifyContent: "center"}}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogIn}>
                <Text style={styles.loginText} >LogIn</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.SignUpBtn} onPress={()=> navigation.navigate('SignUp')}>
            <Text style={styles.loginText} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FaceBookBtn } onPress={()=> navigation.navigate('SignUp')}>
            <Icon iconStyle= {{color: "white"}} type="ionicon" name="logo-facebook"/>
            <Text style={styles.loginText} >Sign Up With Meta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.GoogleBtn} onPress={()=> navigation.navigate('SignUp')}>
            <Icon iconStyle= {{color: "white"}} type="ionicon" name="logo-google"/>
            <Text style={styles.loginText} >Sign Up With Google</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10, height: 70, }}>Or Sign Up Instead</Text>
        
      </View>
    </Screen>
  );
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
    marginBottom: 10,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    backgroundColor: "lightgray",
  },
  SignUpBtn: {
    width: "80%",
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightgray",
  },
  FaceBookBtn: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
    backgroundColor: "#4267B2",
  },
  GoogleBtn: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
    backgroundColor: "#DB4437",
  },
  loginText: {
    color: "white",
    fontSize: "20",
  },
  iconStyle: {
    color: "gray",
    marginBottom: 50

  }
});
