import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image
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

let height = null;

export function ProfileScreen({ navigation, userData }) {
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };


  height = (parseInt(userData.user_height)) / 12
  let heightx = height.toFixed(1).toString()
  let real_height = heightx.replace('.', "'")
  console.log(real_height)


  return (
      
<View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={require("../../../assets/vecteezy_profile-icon-design-vector_5544718.jpg")}
        
      />
      
      
      <View style={styles.body}>
      <View style={styles.personInfo}>
              <View>
              {userData ? (
                <View>
                  <Text style={{fontSize:'17px', fontWeight:'light'}}>{userData.username}</Text>
                  {/* <Text>Age: {userData.user_age}</Text> */}
                  {/* display other user data */}
                </View>
              ) : (
                <Text>Loading user data...</Text>
              )}
            </View>
          </View>
        <View style={styles.bodyContent}>

          <View style={styles.buttonContainer}>
            <Text style={{fontWeight: 'bold'}}>Weight: {userData.user_weight}lbs</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={{fontWeight: 'bold'}}>Height: {real_height}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={{fontWeight: 'bold'}}>Restriction(s): {userData.user_preference}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={{fontWeight: 'bold'}}>Goal: {userData.user_goal}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainerLogOut}>
              <Button title="Logout" color="red" onPress={handleSignOut}></Button>
          </TouchableOpacity>


{/*           
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{fontWeight:'bold'}}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{fontWeight:'bold'}}>Random text soon</Text>
          </TouchableOpacity> */}


        </View>
      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#AD40AF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
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

  buttonContainerLogOut: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },

  personInfo: {
    marginTop: 30,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
    marginLeft: 71
  },


  statsInfo: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
  },

  // items: {
  //   marginTop: 10,
  // },

  // content: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  // },
  // profileInfo: {
  //   marginTop: 16,
  //   paddingHorizontal: 29,
  //   flexDirection: "row",
  //   backgroundColor: "lightblue",
  // },
  // image: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 60,
  //   borderColor: "#ddd",
  //   borderWidth: 1,
  //   backgroundColor: "#dcdcdc",
  // },
  // nameSection: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "gray",
  // },
  // circleText: {
  //   fontSize: 20,
  //   textAlign: "center",
  //   margin: 10,
  //   marginRight: 20,
  // },
  // CircleShape: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 90 / 2,
  //   backgroundColor: "#BEBEBE",
  // },

  // wrapper: {
  //   paddingTop: 20,
  //   paddingHorizontal: 20,
  // },

  // buttonContainer: {
  //   marginTop: 10,
  //   height: 45,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 20,
  //   width: 250,
  //   borderRadius: 30,
  //   backgroundColor: '#AD40AF',
  // },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 10
  // },

  // header: {
  //   backgroundColor: '#AD40AF',
  //   height: 200,
  // },

});

