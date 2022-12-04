import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View} from 'react-native';
import { Formik } from 'formik';
import { RadioButton } from '../../components/RadioButton';

export function FormFillInScreen({navigation}) {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [feet, setFeet] = useState('')
    const [inches, setInches] = useState('')
    const [weight, setWeight] = useState('')
    const [exerciseLevel, setExerciseLevel] = useState('')
    const handleSubmit = () => {
        setHeight(feet + ' ' + inches)
    }

    return(
        <SafeAreaView >
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                        placeholder="Enter Your Name"
                        placeholderTextColor = "003f5c"
                        value = {name}
                        onChangeText={text => setName(text)}
                        style={styles.textInput}
                        />
                        
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Age:</Text>
                        <TextInput
                        placeholder="Enter Your Age"
                        placeholderTextColor = "003f5c"
                        value = {age}
                        onChangeText={text => setAge(text)}
                        style={styles.textInput}
                        />
                        
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Height:</Text>
                        <TextInput
                        placeholder="Feet"
                        placeholderTextColor = "003f5c"
                        value = {feet}
                        onChangeText={text => setFeet(text)}
                        style={styles.textInput}
                        />
                        <Text>ft</Text>
                        <TextInput
                        placeholder="Inches"
                        placeholderTextColor = "003f5c"
                        value = {inches}
                        onChangeText={text => setInches(text)}
                        style={styles.textInput}
                        />
                        <Text>in</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Weight:</Text>
                        <TextInput
                        placeholder="Weight"
                        placeholderTextColor = "003f5c"
                        value = {weight}
                        onChangeText={text => setWeight(text)}
                        style={styles.textInput}
                        />
                        <Text >lbs</Text>
                        
                    </View>
                    
                </View>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <RadioButton header={'What is your current goal?'} labels={['Bulk', 'Maintain', 'Cut']}/>
                    <RadioButton header={'What is your current exercise level?'} labels={['1-2 times a week','3-4 times a week', '5-6 times a week']}/>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: { 
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 10,
        fontSize: 25
    },
    inputWrapper: {
        flexDirection: 'row',
        margin: 50,
        alignItems: 'center',
    },
    label: {
        fontWeight: '500',
        fontSize: 25
    },
    submitBtn: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "lightgray",
    }
});

// export const FormFillInScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//         <ScrollView style={styles.scrollView}>
//             <View style={{width: "100%", backgroundColor: "blue", height:"50%"}}></View>
//             <View style={styles.goals}></View>
//             <View style={styles.nameSection}>
//                 <Text>Test User</Text>
//                 <Text>Daily Calories: </Text>
//             </View>
//             <View style={styles.goals}></View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }