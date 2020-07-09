import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const ModalDetailView = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const list = props.frontList;

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackButtonPress={props.toggleModal}
      onBackdropPress={props.toggleModal}
      animationOutTiming={300}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.BoldText}>Select Items for Display</Text>
          <Text>choose any 5 categories</Text>
          {list.length === 5 && (
            <View>
              <Text style={{ color: "red" }}>
                *you can't choose more than 5 items
              </Text>
            </View>
          )}
        </View>
        <FlatList
          data={props.data}
          keyExtractor={(item) => String(item.Local_Id)}
          showsVerticalScrollIndicator={false}
          renderItem={(itemData) => (
            <View style={styles.checkContainer}>
              <Ionicons
                name={
                  list.includes(itemData.item)
                    ? "md-checkbox"
                    : "md-square-outline"
                }
                color={Colors.primary}
                onPress={() => {
                  if (list.includes(itemData.item)) {
                    const newList = list.filter(
                      (item) => item.Local_Id !== itemData.item.Local_Id
                    );
                    props.setFront(newList);
                  } else {
                    const newList = [...list, itemData.item];
                    if (list.length < 5) {
                      props.setFront(newList);
                    }
                  }
                }}
                size={20}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.Text}>{itemData.item.category_Name}</Text>
            </View>
          )}
        />
        <TouchableCmp onPress={props.toggleModal}>
          <View
            style={{
              ...styles.buttonContainer,
              width: "30%",
              alignSelf: "center",
              marginVertical: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableCmp>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  checkContainer: {
    flexDirection: "row",
    margin: 10,
  },
  Text: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  BoldText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "red",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  header: {
    marginVertical: 10,
  },
});

export default ModalDetailView;
