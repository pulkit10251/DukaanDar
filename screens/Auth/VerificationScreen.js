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
} from "react-native";
import * as AuthActions from "../../store/actions/AuthActions";
import { useDispatch } from "react-redux";

const VerificationScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHandler = async (email) => {
    if (email === "") {
      Alert.alert("Hey !", "Email field can't be empty!");
    } else {
      setError(null);
      try {
        await dispatch(AuthActions.passwordReset(email));
      } catch (err) {
        setError(err.message);
      }

      Alert.alert(
        "Sucess ! ",
        "A link has been sent to your email address.You can change your password from there."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Registered Email Id..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          onSubmitEditing={() => setEmail(email)}
        />
      </View>
      <TouchableCmp onPress={() => submitHandler(email)}>
        <View style={styles.loginBtn}>
          <Text style={styles.loginText}>SEND LINK</Text>
        </View>
      </TouchableCmp>

      <TouchableCmp onPress={() => props.navigation.navigate("Login")}>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text style={styles.loginText}>BACK TO LOGIN ?</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

VerificationScreen.navigationOptions = (NavData) => {
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
  textStyle: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans",
    marginVertical: 40,
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
  },
  line: {
    marginVertical: 40,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default VerificationScreen;
