import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "./ProfileScreen";
import { IngredientsScreen } from "./IngredientsScreen";
import { MyMealsScreen } from "./MyMealsScreen";
import { RecipesScreen } from "./RecipesScreen";
import { Search } from "./Search";
import { Instacart } from "./Instacart";

const Tabs = createBottomTabNavigator();

export function HomeScreen({ route }) {
  const { user } = route.params;
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name={SCREEN_NAMES.Profile}>
        {(props) => <ProfileScreen {...props} user={user} />}
      </Tabs.Screen>
      <Tabs.Screen name={SCREEN_NAMES.MyMeals} component={MyMealsScreen} />
      <Tabs.Screen name={SCREEN_NAMES.Search} component={Search} />
      <Tabs.Screen name={SCREEN_NAMES.Instacart} component={Instacart} />
      {/* <Tabs.Screen name={SCREEN_NAMES.Recipes} component={RecipesScreen}/>
            <Tabs.Screen name={SCREEN_NAMES.Ingredients} component={IngredientsScreen}/> */}
    </Tabs.Navigator>
  );
}
