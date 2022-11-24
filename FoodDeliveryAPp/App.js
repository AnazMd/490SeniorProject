import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, TITLE } from "./src/constants/styles";
import { SafeAreaView } from "react-native";
import { SignInScreen } from "./src/screens/authScreens/SignInScreen";
import { SignUpScreen } from "./src/screens/authScreens/SignUpScreen";
import { ProfileScreen } from "./src/screens/HomeScreens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "./src/constants/navigation";
import { create}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerStyle: {backgroundColor: "#018786"}}}>
        <Stack.Screen
          name={SCREEN_NAMES.SignIn}
          component={SignInScreen}
          options={{
            title: "Sign In To Plan Your Meals Today",
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.Profile}
          component={ProfileScreen}
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
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
