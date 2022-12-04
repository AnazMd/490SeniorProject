import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, {useState} from 'react'

export const RadioButton = ({header, labels}) => {
const [goal, setGoal] = useState('')
  return (
    <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>
        <View style={styles.wrapper}>
            {labels.map(goals => (
                <View key={goals} style={styles.mood}>
                    <Text>{goals}</Text>
                    <TouchableOpacity
                        onPress={() => setGoal(goals)}
                        style={styles.outer}
                    >
                        { goal === goals && <View style={styles.inner}/>}
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center'
      },
      outer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inner: {
        width: 15,
        height: 15,
        backgroundColor: 'gray',
        borderRadius: 10,
      },
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        //width: "100%",
      },
      mood: {
        alignItems: 'center',
        margin: 10,
      },
      header: {
        fontSize: 25,
        fontWeight: '500',
        marginTop: 50
      }
})