import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/AuthActions";

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
      const { token, userId, expiryDate, type, refreshToken } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (!refreshToken) {
        props.navigation.navigate("Auth");
        return;
      }

      if (expirationDate <= new Date() || !token || !userId) {
        try {
          await dispatch(AuthActions.refreshCredentials(refreshToken, type));
          if (type === "User") {
            props.navigation.navigate("Shop");
            return;
          } else {
            props.navigation.navigate("Admin");
            return;
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(AuthActions.authenticate(userId, token, expirationTime));
      if (type === "User") {
        props.navigation.navigate("Shop");
      } else if (type === "DukaanDar") {
        props.navigation.navigate("Admin");
      }
      return;
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
