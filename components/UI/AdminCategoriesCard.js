import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AdminBoxView from "./AdminBoxView";
import Colors from "../../constants/Colors";
import * as ShopActions from "../../store/actions/ShopAction";

const AdminCategoriesCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const catId = props.catId;

  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          props.navigate(catId, props.shopId);
        }}
        useForeground
      >
        <View style={styles.box}>
          <Image source={{ uri: props.catImage }} style={styles.image} />
          <Text style={styles.text}>{props.category}</Text>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={Dimensions.get("screen").width * 0.1}
            style={styles.icon}
            onPress={() => {
              Alert.alert(
                "Are you sure ?",
                "All the categories or products present inside this Global category will also be deleted!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Ok",
                    onPress: () =>
                      props.dispatch(
                        ShopActions.removeGlobal(props.shopId, props.catId)
                      ),
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    marginVertical: 10,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    padding: 10,
    alignItems: "center",
  },
  touchable: {
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    height: Dimensions.get("screen").height * 0.15,
    width: Dimensions.get("screen").height * 0.15,
    alignItems: "flex-start",
    marginVertical: 10,
    marginRight: 10,
  },
  text: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: Dimensions.get("screen").width * 0.045,
  },
  icon: {
    marginLeft: "auto",
    color: "red",
  },
  expandedView: {
    width: "100%",
  },
  ButtonContainer: {
    width: " 90%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    height: 40,
    margin: 10,
    alignSelf: "center",
  },
  ButtonText: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "white",
  },
});

export default AdminCategoriesCard;
