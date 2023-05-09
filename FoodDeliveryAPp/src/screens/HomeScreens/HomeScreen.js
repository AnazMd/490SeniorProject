import React, { useState, useEffect } from "react";
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
import { db } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";

import { IngredientsProvider } from "../../components/IngredientsContext";


import { Stats } from "./Stats";

const Tabs = createBottomTabNavigator();

export function HomeScreen({ route }) {
  const { user } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(db, `users/${user.uid}`);

    onValue(userRef, (snapshot) => {
      setUserData(snapshot.val());
    });
    console.log(userData);
    return () => off(userRef);
  }, [user]);

  return (
    <IngredientsProvider>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen name={SCREEN_NAMES.Profile}>
          {(props) => <ProfileScreen {...props} userData={userData} />}
        </Tabs.Screen>
        <Tabs.Screen name={SCREEN_NAMES.MyMeals}>
          {(props) => <MyMealsScreen {...props} userData={userData} />}
        </Tabs.Screen>
        <Tabs.Screen name={SCREEN_NAMES.Search} component={Search} />
        <Tabs.Screen name={SCREEN_NAMES.Instacart} component={Instacart} />

        <Tabs.Screen name={SCREEN_NAMES.Stats}>
          {(props) => <Stats {...props} userData={userData} />}
          </Tabs.Screen>


        {/*<Tabs.Screen name={SCREEN_NAMES.RecipesScreen}>
        {(props) => <RecipesScreen {...props} user={user} />}
          </Tabs.Screen> // Commented out recipes screen. The rest after this line was already commented out
        {/* <Tabs.Screen name={SCREEN_NAMES.Recipes} component={RecipesScreen}/>
              <Tabs.Screen name={SCREEN_NAMES.Ingredients} component={IngredientsScreen}/> */}
      </Tabs.Navigator>
    </IngredientsProvider>
  );
}
