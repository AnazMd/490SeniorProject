import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


const ProfileLists = (props) => {

    return (
        <View style={styles.itemSort}>
            <Text>{props.text}</Text>
            {/*This is how you add an ICON... icon is used from react-native-elements */}
            <Icon name='home' />

            

          

        </View>
    )
}

const styles = StyleSheet.create({
    itemSort: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center', 
        backgroundColor: '#FFF'

    },
    textItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }



});

export default ProfileLists;