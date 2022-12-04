import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, TITLE } from "./src/constants/styles";
import { SafeAreaView } from "react-native";
import { SignInScreen } from "./src/screens/authScreens/SignInScreen";
import { SignUpScreen } from "./src/screens/authScreens/SignUpScreen";
import { HomeScreen } from "./src/screens/HomeScreens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "./src/constants/navigation";
import { useState } from "react";
const Stack = createNativeStackNavigator();


function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, headerStyle:{backgroundColor:"#018786"}}}>
        <Stack.Screen
          name={SCREEN_NAMES.SignIn}
          component={SignInScreen}
          options={{
            title: "Sign In To Plan Your Meals Today",
          }}
          
        />
        <Stack.Screen
          name={SCREEN_NAMES.SignUp}
          component={SignUpScreen}
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
            name={SCREEN_NAMES.Home}
            component={HomeScreen}
            options={{
              title: "Sign In To Plan Your Meals Today",
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

// if (state.isLoading) {
//   // We haven't finished checking for the token yet
//   return <SplashScreen />;
// }

// return (
//   <Stack.Navigator>
//     {state.userToken == null ? (
//       // No token found, user isn't signed in
//       <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           title: 'Sign in',
//           // When logging out, a pop animation feels intuitive
//           // You can remove this if you want the default 'push' animation
//           animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//         }}
//       />
//     ) : (
//       // User is signed in
//       <Stack.Screen name="Home" component={HomeScreen} />
//     )}
//   </Stack.Navigator>
// );