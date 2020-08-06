import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";
import { useSelector } from "react-redux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { normalize } from "react-native-elements";


const ModalView = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const storeData = useSelector((state) => {
    const code = [];
    for (var i = 0; i < state.shops.ShopData.length; i++) {
      code.push(state.shops.ShopData[i].shop_Id);
    }
    return code;
  });

  const onSubmit = (data, ShopData) => {
    if (data.length === 8) {
      if (storeData.includes(data)) {
        props.setModalVisibility(false);
        props.dispatch(ShopStoreActions.addStore(data, ShopData));
        props.dispatch(ShopStoreActions.addCustomerData());
      } else {
        Alert.alert("Invalid Code", "you have provided wrong code", [
          { text: "OK" },
        ]);
      }
    } else if (data.length != 0) {
      Alert.alert("Invalid Code", "you have provided wrong code", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackButtonPress={props.toggleModal}
      onBackdropPress={props.toggleModal}
      animationOutTiming={100}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View>
            <Text style={styles.text}>Enter Shop Id or scan Qr code</Text>
            <View style={styles.rowContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder={props.shopId === "" ? "Enter ID" : props.shopId}
                  placeholderTextColor={props.shopId === "" ? "#888" : "black"}
                  value={props.shopId}
                  onChangeText={(text) => props.setShopId(text)}
                  onSubmitEditing={() => onSubmit(props.shopId, props.ShopData)}
                  maxLength={8}
                />
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-qr-scanner"
                      : "ios-qr-scanner"
                  }
                  size={28}
                  onPress={() => {
                    props.navigate();
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.ButtonContainer}>
            <View style={styles.trash}>
              <TouchableCmp onPress={props.toggleModal}>
                <View style={styles.deletebutton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </View>
              </TouchableCmp>
            </View>
            <View style={styles.Details}>
              <TouchableCmp
                onPress={() => onSubmit(props.shopId, props.ShopData)}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: hp('25%'),
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius:10,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: normalize(15),
    marginHorizontal: 10,
  },
  rowContainer: {
    width: "95%",
    height: "35%",
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 10,
  },
  textInputContainer: {
    height: "100%",
    width: "70%",
    borderRadius: 2,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    justifyContent: "center",
  },
  iconContainer: {
    marginVertical: 10,
    height: "100%",
    width: "20%",
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    marginTop: "auto",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  deletebutton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "red",
    padding: 8,
    width: 100,
  },
  trash: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  Details: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    padding: 8,
    width: 100,
  },
});

export default ModalView;
