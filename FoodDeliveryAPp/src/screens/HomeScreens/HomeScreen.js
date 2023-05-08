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
import { Search } from "./Search";
import { Instacart } from "./Instacart";
import { RecipesScreen } from "./RecipesScreen";

import { IngredientsProvider } from '../../components/IngredientsContext';

const Tabs = createBottomTabNavigator();

export function HomeScreen({ route }) {
  const { user } = route.params;
  return (
    <IngredientsProvider>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen name={SCREEN_NAMES.Profile}>
          {(props) => <ProfileScreen {...props} user={user} />}
        </Tabs.Screen>
        <Tabs.Screen name={SCREEN_NAMES.MyMeals}>
          {(props) => <MyMealsScreen {...props} user={user} />}
        </Tabs.Screen>
        
        <Tabs.Screen name={SCREEN_NAMES.Search} component={Search} />
        <Tabs.Screen name={SCREEN_NAMES.Instacart} component={Instacart} />
        <Tabs.Screen name={SCREEN_NAMES.RecipesScreen}>
        {(props) => <RecipesScreen {...props} user={user} />}
          </Tabs.Screen>
        {/* <Tabs.Screen name={SCREEN_NAMES.Recipes} component={RecipesScreen}/>
              <Tabs.Screen name={SCREEN_NAMES.Ingredients} component={IngredientsScreen}/> */}
      </Tabs.Navigator>
    </IngredientsProvider>
  );
}
