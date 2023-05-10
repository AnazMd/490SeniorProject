import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.replace("Home");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Icon size={150} type="material" name="restaurant" />
        </View>
        <Text style={styles.header}>Login</Text>
        <View style={styles.textInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogIn}
          disabled={loading}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 30,
          }}
        >
          Or, login with...
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={[styles.alternateLogin, { backgroundColor: "#4267B2" }]}
          >
            <Icon
              iconStyle={{ color: "white" }}
              type="ionicon"
              name="logo-facebook"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.alternateLogin, { backgroundColor: "#DB4437" }]}
          >
            <Icon
              iconStyle={{ color: "white" }}
              type="ionicon"
              name="logo-google"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New User?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  textInput: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  loginBtn: {
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  loginText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  },
  alternateLogin: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
