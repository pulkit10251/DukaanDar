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
} from "react-native";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/AuthActions";
import { normalize } from "react-native-elements";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHander = async (user, email, password) => {
    if (email === "" || password === "") {
      Alert.alert("Hey!", "One or more fields are empty");
    } else {
      setLoading(true);
      setError(null);
      try {
        await dispatch(AuthActions.signin(email, password, user));
        if(user === "User"){
          props.navigation.navigate("Shop");
        }else{
          props.navigation.navigate("Admin");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false)
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.Titletext}>DukaanDar</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 15,
          alignItems: "center",
          marginBottom: 40,
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
          <Text style={styles.loginText}> or </Text>
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
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
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

      <TouchableCmp onPress={()=>props.navigation.navigate("Verify")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableCmp>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40 }}
          color="white"
        />
      ) : (
        <TouchableCmp onPress={() => submitHander(user, email, password)}>
          <View style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </View>
        </TouchableCmp>
      )}
      <View
        style={{
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <TouchableCmp onPress={() => props.navigation.navigate("SignUp")}>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Text style={styles.loginText}>New User / DukaanDar ? Signup</Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = (NavData) => {
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
    fontSize: normalize(12)
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: normalize(12)
  },
  forgot: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: normalize(12)
  },
  Titletext: {
    color: "white",
    marginBottom: 20,
    fontSize: normalize(40),
    fontFamily: "sans-serif-medium",
  },
  buttonText: {
    fontFamily: "open-sans",
    fontSize: normalize(12)
  },
});

export default LoginScreen;
