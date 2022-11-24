import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, TITLE } from "./src/constants/styles";
import { SafeAreaView } from "react-native";
import { SignInScreen } from "./src/screens/authScreens/SignInScreen";
import { SignUpScreen } from "./src/screens/authScreens/SignUpScreen";
import { HomeScreen } from "./src/screens/HomeScreens/HomeScreen";
import { ProfileScreen } from "./src/screens/HomeScreens/ProfileScreen";
import { IngredientsScreen } from "./src/screens/HomeScreens/IngredientsScreen";
import { MyMealsScreen } from "./src/screens/HomeScreens/MyMealsScreen";
import { RecipesScreen } from "./src/screens/HomeScreens/RecipesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "./src/constants/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Tabs.Navigator>
        <Tabs.Screen name={SCREEN_NAMES.MyMeals} component={MyMealsScreen}/>
        <Tabs.Screen name={SCREEN_NAMES.Profile} component={ProfileScreen}/>
        <Tabs.Screen name={SCREEN_NAMES.Recipes} component={RecipesScreen}/>
        <Tabs.Screen name={SCREEN_NAMES.Ingredients} component={IngredientsScreen}/>
      </Tabs.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Group screenOptions={{headerStyle: {backgroundColor: "#018786"}}}>
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
          component={Home}
          options={{
            title: "Sign In To Plan Your Meals Today",
          }}
        />
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
