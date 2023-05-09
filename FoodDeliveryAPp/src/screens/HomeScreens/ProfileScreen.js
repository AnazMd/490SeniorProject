import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase"
import ProfileLists from "../../components/ProfileLists";

const ListItem = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};
export function ProfileScreen({ navigation, userData }) {
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };


  return (
    <Screen>
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <View style={styles.CircleShape} />
        <View>
          {userData ? (
            <View>
              <Text>Name: {userData.username}</Text>
              <Text>Age: {userData.user_preference}</Text>
              {/* display other user data */}
            </View>
          ) : (
            <Text>Loading user data...</Text>
          )}
        </View>
      </View>

      <View style={styles.wrapper}>
        {/* This will show the list options on the profile screen */}
        <View style={styles.items}>
          {/* <Text style={styles.circleText}> Testing Place </Text> */}
          <ProfileLists text={"Profile"} />
          <ProfileLists text={"Notifications"} />
          <ProfileLists text={"Weekly Summary"} />
          <ProfileLists text={"Past Transactions"} />
          <ProfileLists text={"General Settings"} />
        </View>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Logout" color="red" onPress={handleSignOut}></Button>
      </View>

      {/* <SafeAreaView style={styles.content}>
                <ScrollView 
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{paddingBottom: 29}}
                >
                    <View style={styles.profileInfo}>
                        <View style={styles.image}></View>
                        <View style={styles.nameSection}>
                            <Text>Test User</Text>
                            <Text>Daily Calories: </Text>
                        </View>
                    </View>
                    <View>
                        <ListItem name="Settings"></ListItem>
                        <ListItem name="Progress"></ListItem>
                    </View>
                </ScrollView>
            </SafeAreaView> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  items: {
    marginTop: 10,
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileInfo: {
    marginTop: 16,
    paddingHorizontal: 29,
    flexDirection: "row",
    backgroundColor: "lightblue",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#dcdcdc",
  },
  nameSection: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  circleText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginRight: 20,
  },
  CircleShape: {
    width: 100,
    height: 100,
    borderRadius: 90 / 2,
    backgroundColor: "#BEBEBE",
  },

  wrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#AD40AF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  header: {
    backgroundColor: '#AD40AF',
    height: 200,
  },

});

