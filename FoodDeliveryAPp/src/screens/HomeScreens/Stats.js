
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native'
import { SCREEN_NAMES } from "../../constants/navigation";

import { Screen } from "../../components/layout/Screen";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase"

import ProfileLists from "../../components/ProfileLists";

export function Stats( {userData} ){


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };

  console.log(userData.username)
  
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        // source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
        
      />
      
      
      <View style={styles.body}>
      <View style={styles.personInfo}>
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
        <View style={styles.bodyContent}>
          
          
          {/* <Text style={styles.name}>John Doesss</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
            omittam deseruisse consequuntur ius an,
          </Text> */}

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{fontWeight:'bold'}}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{fontWeight:'bold'}}>Random text soon</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainerLogOut}>
              <Button title="Logout" color="red" onPress={handleSignOut}></Button>
          </TouchableOpacity>


        </View>
      </View>
    </View>
    
  )
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
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
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
    marginTop: 40,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    marginLeft: 70
  },
})