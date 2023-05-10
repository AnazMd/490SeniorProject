import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { RadioButton } from "../../components/RadioButton";
import { getDatabase, ref, set } from "firebase/database";

export function FormFillInScreen({ navigation, route }) {
  const { userid } = route.params;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseLevel, setExerciseLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [preference, setPreference] = useState("");

  const validateForm = () => {
    if (
      !name ||
      !age ||
      !feet ||
      !inches ||
      !weight ||
      !exerciseLevel ||
      !goal ||
      !preference
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }

    if (
      parseInt(feet) < 1 ||
      parseInt(inches) < 0 ||
      parseInt(feet) > 8 ||
      parseInt(inches) > 11
    ) {
      Alert.alert("Error", "Invalid Height");
      return false;
    }

    if (parseInt(weight) < 0) {
      Alert.alert("Error", "Invalid Weight");
      return false;
    }

    if (parseInt(age) < 4) {
      Alert.alert("Error", "Invalid Age");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const height = parseInt(feet) * 12 + parseInt(inches);
    let User = {
      user_name: name,
      user_age: age,
      user_height: height,
      user_weight: weight,
      user_eLvl: exerciseLevel,
      user_goal: goal,
      user_preference: preference,
      user_id: userid,
    };
    await writeUserData(User);
    navigation.navigate("Home");
  };

  function writeUserData(user) {
    const db = getDatabase();
    set(ref(db, "users/" + user.user_id), {
      username: user.user_name,
      user_age: user.user_age,
      user_height: user.user_height,
      user_weight: user.user_weight,
      user_eLvl: user.user_eLvl,
      user_goal: user.user_goal,
      user_preference: user.user_preference,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            mode="outlined"
            label="Enter Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            mode="outlined"
            label="Enter Your Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="number-pad"
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Height:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              mode="outlined"
              label="Ft"
              value={feet}
              onChangeText={(text) => setFeet(text)}
              keyboardType="number-pad"
              style={styles.heightInput}
            />
            <Text>ft</Text>
            <TextInput
              mode="outlined"
              label="In"
              value={inches}
              onChangeText={(text) => setInches(text)}
              keyboardType="number-pad"
              style={styles.heightInput}
            />
            <Text>in</Text>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Weight:</Text>
          <TextInput
            mode="outlined"
            label="Weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType="number-pad"
            style={styles.weightInput}
          />
          <Text>lbs</Text>
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <RadioButton
            val={goal}
            changeVal={setGoal}
            header={"What is your current goal?"}
            labels={["Bulk", "Maintain", "Cut"]}
          />
          <RadioButton
            val={exerciseLevel}
            changeVal={setExerciseLevel}
            header={"What is your current exercise level?"}
            labels={[
              "1-2 times a week",
              "3-4 times a week",
              "5-6 times a week",
            ]}
          />
          <RadioButton
            val={preference}
            changeVal={setPreference}
            header={"Any Food Preferences?"}
            labels={["Vegan", "Vegetarian", "None"]}
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitBtn}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    marginBottom: 12,
  },
  heightInput: {
    width: 50,
    marginBottom: 12,
    marginRight: 10,
  },
  weightInput: {
    width: 100,
    marginBottom: 12,
    marginRight: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    fontSize: 25,
    marginRight: 10,
  },
  submitBtn: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
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
