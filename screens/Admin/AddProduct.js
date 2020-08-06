import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import Imagess from "../../constants/Imagess";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";
import Colors from "../../constants/Colors";
import { normalize } from "react-native-elements";

const AddProduct = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const GlobalId = props.navigation.getParam("GlobalId");
  const LocalId = props.navigation.getParam("LocalId");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [mfdDate, setMfdDate] = useState("");
  const [availability, setAvailability] = useState(true);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const submitHandler = () => {
    if (
      image === "" ||
      price === "" ||
      mrp === "" ||
      name === "" ||
      quantity === "" ||
      unit === "" ||
      mfdDate === ""
    ) {
      Alert.alert(
        "Please Check!",
        "Hey ! you have left one or more field empty !!!"
      );
    } else {
      dispatch(
        ShopActions.addProduct(
          shopId,
          GlobalId,
          name,
          LocalId,
          image,
          quantity,
          unit,
          mfdDate,
          shelfLife,
          price,
          mrp,
          availability
        )
      );
      props.navigation.pop();
    }
  };

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image === "" ? Imagess.NoImage : image }}
              style={styles.Image}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.textField}>Image Url:</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Paste the Image Url here"
                placeholderTextColor="#888"
                value={image}
                onChangeText={(text) => {
                  setImage(text);
                }}
                onSubmitEditing={() => setImage(image)}
                numberOfLines={1}
              />

              {image != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setImage("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Product Name:</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                onSubmitEditing={() => setName(name)}
              />

              {name != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setName("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Product Mrp:</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mrp"
                placeholderTextColor="#888"
                value={mrp}
                onChangeText={(text) => {
                  setMrp(text);
                }}
                onSubmitEditing={() => setMrp(mrp)}
                numberOfLines={1}
                keyboardType="numeric"
              />

              {mrp != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setMrp("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Product Price</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#888"
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                }}
                onSubmitEditing={() => setPrice(price)}
                numberOfLines={1}
                keyboardType="numeric"
              />

              {price != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setPrice("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Product Quantity</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Amount of Product(1,5,10)"
                placeholderTextColor="#888"
                value={quantity}
                onChangeText={(text) => {
                  setQuantity(text);
                }}
                onSubmitEditing={() => setQuantity(quantity)}
                numberOfLines={1}
                keyboardType="numeric"
              />

              {quantity != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setQuantity("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Unit</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Unit (L, ml, g, Kg, piece)"
                placeholderTextColor="#888"
                value={unit}
                onChangeText={(text) => {
                  setUnit(text);
                }}
                onSubmitEditing={() => setUnit(unit)}
                numberOfLines={1}
              />

              {unit != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setImage("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Date of Manufacturing:</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mfd Date"
                placeholderTextColor="#888"
                value={mfdDate}
                onChangeText={(text) => {
                  setMfdDate(text);
                }}
                onSubmitEditing={() => setMfdDate(mfdDate)}
                numberOfLines={1}
              />

              {mfdDate != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setMfdDate("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}>Shelf Life:</Text>
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Shelf Life(6 months, 1 year, 3 months etc )"
                placeholderTextColor="#888"
                value={shelfLife}
                onChangeText={(text) => {
                  setShelfLife(text);
                }}
                onSubmitEditing={() => setShelfLife(mfdDate)}
                numberOfLines={1}
              />

              {shelfLife != "" && (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={Platform.OS === "android" ? "md-close" : "ios-close"}
                    style={styles.iconStyle}
                    onPress={() => {
                      setShelfLife("");
                    }}
                    size={20}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textField}> Availability:</Text>
            <View>
              <TouchableCmp onPress={() => setAvailability((state) => !state)}>
                <View
                  style={{
                    backgroundColor:
                      availability === true ? Colors.primary : "red",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    alignSelf: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text style={styles.buttonText}>
                    {availability === true ? "Available" : "Not Available"}
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
          <TouchableCmp onPress={() => submitHandler()}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableCmp>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

AddProduct.navigationOptions = (NavData) => {
  return {
    headerTitle: "Add Product",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    margin: 10,
    width: "80%",
    aspectRatio: 1,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  textField: {
    fontFamily: "open-sans-bold",
    fontSize: normalize(16),
    margin: 10,
  },
  inputStyle: {
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  TextInputContainer: {
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    height: "100%",
    fontSize: normalize(12),
  },
  iconStyle: {
    color: "#888",
    opacity: 0.6,
    alignSelf: "center",
  },
  iconContainer: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "30%",
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-sans",
    fontSize: normalize(16),
  },
});

export default AddProduct;
