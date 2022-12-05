import React from 'react';
import {View, Text, StyleSheet } from 'react-native';


const ProfileLists = (props) => {

    return (
        <View style={styles.itemSort}>
            <Text>{props.text}</Text>

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

    }



});

export default ProfileLists;