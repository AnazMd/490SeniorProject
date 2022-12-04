import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView} from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const ListItem = ({name}) => {
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}
export function ProfileScreen({navigation}){
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("SignIn")
            })
            .catch(error => alert(error.message))
    }
    return (
        <Screen>
            <View style={{flex: 1, alignItems: 'center', marginTop: 50}}> 
                <View style={styles.CircleShape} /> 
                <Text style={styles.circleText}> Profile Pic </Text>
            </View> 



            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                
            

            
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
        
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
      },
    profileInfo: {
        marginTop: 16,
        paddingHorizontal: 29,
        flexDirection: 'row',
        backgroundColor: 'lightblue'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#dcdcdc',
    },
    nameSection: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
    },
    circleText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
      }, 
      CircleShape: {
        width: 100,
        height: 100,
        borderRadius: 90 / 2,
        backgroundColor: '#BEBEBE',
      },
})
