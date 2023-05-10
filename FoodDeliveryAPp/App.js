import { View, ActivityIndicator } from "react-native";
import { SignInScreen } from "./src/screens/authScreens/SignInScreen";
import { SignUpScreen } from "./src/screens/authScreens/SignUpScreen";
import { HomeScreen } from "./src/screens/HomeScreens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "./src/constants/navigation";
import { useState, useEffect } from "react";
import { FormFillInScreen } from "./src/screens/authScreens/FormFillInScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Favorites } from "./src/screens/HomeScreens/Favorites";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [initializing]);

  return (
    <NavigationContainer>
      {initializing ? (
        // Render a loading indicator while initializing
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#018786" />
        </View>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#018786" },
          }}
        >
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
            name={SCREEN_NAMES.FormFillIn}
            component={FormFillInScreen}
          />

          {/* <Stack.Screen
            name={SCREEN_NAMES.Favorites}
            component={Favorites}
          /> */}
          <Stack.Screen
            name={SCREEN_NAMES.Home}
            component={HomeScreen}
            initialParams={{ user: user }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { COLORS, TITLE } from "./src/constants/styles";
// import { SafeAreaView } from "react-native";
// import { SignInScreen } from "./src/screens/authScreens/SignInScreen";
// import { SignUpScreen } from "./src/screens/authScreens/SignUpScreen";
// import { HomeScreen } from "./src/screens/HomeScreens/HomeScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SCREEN_NAMES } from "./src/constants/navigation";
// import { useState, useEffect } from "react";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { FormFillInScreen } from "./src/screens/authScreens/FormFillInScreen";
// const Stack = createNativeStackNavigator();

// function App() {
//   return (
{
  /* <NavigationContainer>
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: "#018786" },
    }}
  >
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
    <Stack.Screen name={SCREEN_NAMES.FormFillIn} component={FormFillInScreen} />
    <Stack.Screen name={SCREEN_NAMES.Home} component={HomeScreen} />
  </Stack.Navigator>
</NavigationContainer>; */
}
//   );
// }

//export default App;
