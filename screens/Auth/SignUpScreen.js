import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import * as AuthActions from "../../store/actions/AuthActions";
import { useDispatch } from "react-redux";

const SignUpScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const [user, setUser] = useState("User");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHandler = async (name, contact, email, password, confirm) => {
    if (
      name === "" ||
      contact === "" ||
      email === "" ||
      password === "" ||
      confirm === ""
    ) {
      Alert.alert("Hey!", "One or more fields are empty");
    } else if (password !== confirm) {
      Alert.alert("Hey!", "The password do not match! Try again!!");
      setPassword("");
      setConfirm("");
    } else {
      setError(null);
      setLoading(true);
      try {
        await dispatch(
          AuthActions.signup(email, password, name, contact, user)
        );
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    
    >
      <View>
        <Text style={styles.signupText}>Are You...</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 15,
          alignItems: "center",
          marginBottom: 20,
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <TouchableCmp onPress={() => setUser("User")}>
          <View
            style={{
              ...styles.button,
              backgroundColor: user === "User" ? "#fb5b5a" : "white",
            }}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: user === "User" ? "white" : "black",
              }}
            >
              Customer
            </Text>
          </View>
        </TouchableCmp>
        <View>
          <Text style={styles.signupText}> or </Text>
        </View>
        <TouchableCmp onPress={() => setUser("DukaanDar")}>
          <View
            style={{
              ...styles.button,
              backgroundColor: user === "DukaanDar" ? "#fb5b5a" : "white",
            }}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: user === "DukaanDar" ? "white" : "black",
              }}
            >
              DukaanDar
            </Text>
          </View>
        </TouchableCmp>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          onSubmitEditing={() => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          keyboardType="decimal-pad"
          placeholder="Contact Number"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setContact(text);
          }}
          value={contact}
          onSubmitEditing={() => setContact(contact)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          keyboardType="email-address"
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          onSubmitEditing={() => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          onSubmitEditing={() => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setConfirm(text);
          }}
          value={confirm}
          onSubmitEditing={() => setConfirm(confirm)}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40 }}
          color="white"
        />
      ) : (
        <TouchableCmp
          onPress={() => submitHandler(name, contact, email, password, confirm)}
        >
          <View style={styles.signupBtn}>
            <Text style={styles.signupText}>SIGNUP</Text>
          </View>
        </TouchableCmp>
      )}
      <TouchableCmp onPress={() => props.navigation.navigate("Login")}>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text style={styles.signupText}>Login ?</Text>
        </View>
      </TouchableCmp>
    </KeyboardAvoidingView>
  );
};

SignUpScreen.navigationOptions = (NavData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
  button: {
    borderRadius: 25,
    backgroundColor: "white",
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    width: "100%",
  },
  titleText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 35,
  },
  header: {
    marginVertical: 50,
    alignItems: "center",
  },
  signupBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  signupText: {
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default SignUpScreen;
