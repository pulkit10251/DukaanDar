import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  YellowBox,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/AuthActions";

YellowBox.ignoreWarnings(["Setting a timer"]);

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(AuthActions.authenticate(userId, token, expirationTime));
      props.navigation.navigate("Shop");
      // dispatch(AuthActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;
