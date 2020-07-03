import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as ShopActions from "../../store/actions/ShopAction";
import { connect } from "react-redux";

const AdminLocalCategoriesCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const categoryList = props.catList;

  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          props.navigate(props.shopId, props.catId, props.LocId);
        }}
        useForeground
      >
        <View style={styles.box}>
          <Image source={{ uri: props.catImage }} style={styles.image} />
          <Text style={styles.text}>{props.category}</Text>
          <View style={{ marginLeft: "auto" }}>
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={Dimensions.get("screen").width * 0.1}
              style={styles.Editicon}
              onPress={() => {
                props.editNavigate(
                  props.shopId,
                  props.category,
                  props.catImage,
                  props.catId,
                  props.LocId
                );
              }}
            />
          </View>
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

  Editicon: {
    marginLeft: "auto",
    color: Colors.primary,
    marginVertical: 10,
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

export default connect()(AdminLocalCategoriesCard);
