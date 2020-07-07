import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  TextInput,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import Imagess from "../../constants/Imagess";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const EditDetailScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const shopId = props.navigation.getParam("shopId");
  const Shop = useSelector((state) =>
    state.shops.ShopData.find((item) => item.shop_Id === shopId)
  );

  const [shopImage, setShopImage] = useState(Shop.shop_ShopImage);
  const [shopkeeperImage, setShopkeeperImage] = useState(
    Shop.shop_ShopkeeperImage
  );
  const [name, setName] = useState(Shop.shop_Name);
  const [shopkeeperName, setShopkeeperName] = useState(
    Shop.shop_ShopkeeperName
  );
  const [loc, setLoc] = useState(Shop.shop_Location);
  const [open, setOpen] = useState(Shop.shop_OpenDays);
  const [openTimings, setOpenTimings] = useState(Shop.shop_OpenTimings);
  const [closeTimings, setCloseTimings] = useState(Shop.shop_ClosedTimings);
  const [breakTimings, setBreakTimings] = useState(Shop.shop_BreakTimings);
  const [offers, setOffers] = useState(Shop.shop_Offers);
  const [desc, setDesc] = useState(Shop.shop_Description);

  const [showOpen, setShowOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showbreakOpen, setShowbreakOpen] = useState(false);
  const [showbreakClose, setShowbreakClose] = useState(false);

  let openImagePickerAsync = async (setImage) => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const Time = (t) => {
    const curr_date =
      new Date().getMonth() +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear();

    const newTime = new Date(curr_date + " " + t);
    return newTime;
  };
  var bool;
  if (breakTimings === "None") {
    bool = false;
  } else {
    bool = true;
  }
  const [isEnabled, setIsEnabled] = useState(bool);

  const toggleSwitch = (state) => {
    setIsEnabled((previousState) => !previousState);
    if (state === false) {
      setBreakTimings("None");
    } else {
      setBreakTimings("14:00 to 17:00");
    }
  };
  return (
    <ScrollView>
      <View style={{ paddingBottom: 50 }}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: shopImage === "" ? Imagess.NoImage : shopImage }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.BoldText}>Select Image for Shop : </Text>
            <TouchableCmp onPress={() => openImagePickerAsync(setShopImage)}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Select Image</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: shopkeeperImage === "" ? Imagess.NoImage : shopkeeperImage,
              }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.BoldText}>Select Image for ShopKeeper : </Text>
            <TouchableCmp
              onPress={() => openImagePickerAsync(setShopkeeperImage)}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Select Image</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Shop Name:</Text>
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
          <Text style={styles.textField}>Shopkeeper Name:</Text>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={shopkeeperName}
              onChangeText={(text) => {
                setShopkeeperName(text);
              }}
              onSubmitEditing={() => setShopkeeperName(shopkeeperName)}
            />

            {shopkeeperName != "" && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-close" : "ios-close"}
                  style={styles.iconStyle}
                  onPress={() => {
                    setShopkeeperName("");
                  }}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Shop Description:</Text>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={desc}
              onChangeText={(text) => {
                setDesc(text);
              }}
              onSubmitEditing={() => setDesc(desc)}
            />

            {desc != "" && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-close" : "ios-close"}
                  style={styles.iconStyle}
                  onPress={() => {
                    setDesc("");
                  }}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Shop Location:</Text>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={loc}
              onChangeText={(text) => {
                setLoc(text);
              }}
              onSubmitEditing={() => setLoc(loc)}
              numberOfLines={5}
            />

            {loc != "" && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-close" : "ios-close"}
                  style={styles.iconStyle}
                  onPress={() => {
                    setLoc("");
                  }}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Select Close Day:</Text>
          <View style={styles.TextInputContainer}>
            <Picker
              selectedValue={open}
              style={{ height: "100%", width: "100%", alignSelf: "center" }}
              onValueChange={(itemValue) => {
                setOpen(itemValue);
              }}
            >
              <Picker.Item label="Monday" value="open except Monday" />
              <Picker.Item label="Saturday" value="open except Saturday" />
              <Picker.Item label="Sunday" value="open except Sunday" />
              <Picker.Item label="None" value="Everyday" />
            </Picker>
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Shop Open Timings:</Text>
          <View style={styles.TextInputContainer}>
            <Text style={styles.text}>{openTimings}</Text>
            <Ionicons
              name={Platform.OS === "android" ? "md-clock" : "ios-clock"}
              style={{
                marginLeft: "auto",
                marginHorizontal: 10,
                alignSelf: "center",
              }}
              size={20}
              color="#888"
              onPress={() => setShowOpen((state) => !state)}
            />
            {showOpen && (
              <View>
                <DateTimePicker
                  mode="time"
                  value={Time(openTimings)}
                  onChange={(val) => {
                    if (val.type === "set") {
                      const hrs = new Date(
                        val.nativeEvent.timestamp
                      ).getHours();
                      const min = new Date(
                        val.nativeEvent.timestamp
                      ).getMinutes();
                      var time;
                      if (min === 0) {
                        time = hrs + ":" + min + "0";
                      } else {
                        time = hrs + ":" + min;
                      }
                      if (hrs != "NaN" && min != "NaN") {
                        setShowOpen((state) => !state);

                        setOpenTimings(time);
                      }
                    }
                  }}
                  display="clock"
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Shop Close Timings:</Text>
          <View style={styles.TextInputContainer}>
            <Text style={styles.text}>{closeTimings}</Text>
            <Ionicons
              name={Platform.OS === "android" ? "md-clock" : "ios-clock"}
              style={{
                marginLeft: "auto",
                marginHorizontal: 10,
                alignSelf: "center",
              }}
              size={20}
              color="#888"
              onPress={() => setShowClose((state) => !state)}
            />
            {showClose && (
              <View>
                <DateTimePicker
                  mode="time"
                  value={Time(closeTimings)}
                  onChange={(val) => {
                    if (val.type === "set") {
                      const hrs = new Date(
                        val.nativeEvent.timestamp
                      ).getHours();
                      const min = new Date(
                        val.nativeEvent.timestamp
                      ).getMinutes();
                      var time;
                      if (min === 0) {
                        time = hrs + ":" + min + "0";
                      } else {
                        time = hrs + ":" + min;
                      }
                      if (hrs != "NaN" && min != "NaN") {
                        setShowClose((state) => !state);

                        setCloseTimings(time);
                      }
                    }
                  }}
                  display="clock"
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textField}>Shop Break Timings:</Text>
            <Switch
              trackColor={{ false: "#888", true: "#888" }}
              thumbColor={Colors.primary}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginHorizontal: 10, marginLeft: "auto" }}
            />
          </View>
          {isEnabled && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontFamily: "open-sans-bold",
              }}
            >
              <View style={{ ...styles.TextInputContainer, width: "40%" }}>
                <Text style={styles.text}>{breakTimings.slice(0, 5)}</Text>
                <Ionicons
                  name={Platform.OS === "android" ? "md-clock" : "ios-clock"}
                  style={{
                    marginLeft: "auto",
                    marginHorizontal: 10,
                    alignSelf: "center",
                  }}
                  size={20}
                  color="#888"
                  onPress={() => setShowbreakOpen((state) => !state)}
                />
                {showbreakOpen && (
                  <View>
                    <DateTimePicker
                      mode="time"
                      value={Time(breakTimings.slice(0, 5))}
                      onChange={(val) => {
                        if (val.type === "set") {
                          const hrs = new Date(
                            val.nativeEvent.timestamp
                          ).getHours();
                          const min = new Date(
                            val.nativeEvent.timestamp
                          ).getMinutes();
                          var time;
                          if (min === 0) {
                            time = hrs + ":" + min + "0";
                          } else {
                            time = hrs + ":" + min;
                          }
                          if (hrs != "NaN" && min != "NaN") {
                            setShowbreakOpen((state) => !state);
                            var Break = breakTimings.slice(5);
                            setBreakTimings(time + Break);
                          }
                        }
                      }}
                      display="clock"
                    />
                  </View>
                )}
              </View>
              <Text style={{ textAlign: "center" }}>To</Text>
              <View style={{ ...styles.TextInputContainer, width: "40%" }}>
                <Text style={styles.text}>{breakTimings.slice(9)}</Text>
                <Ionicons
                  name={Platform.OS === "android" ? "md-clock" : "ios-clock"}
                  style={{
                    marginLeft: "auto",
                    marginHorizontal: 10,
                    alignSelf: "center",
                  }}
                  size={20}
                  color="#888"
                  onPress={() => setShowbreakClose((state) => !state)}
                />
                {showbreakClose && (
                  <View>
                    <DateTimePicker
                      mode="time"
                      value={Time(breakTimings.slice(9))}
                      onChange={(val) => {
                        if (val.type === "set") {
                          const hrs = new Date(
                            val.nativeEvent.timestamp
                          ).getHours();
                          const min = new Date(
                            val.nativeEvent.timestamp
                          ).getMinutes();
                          var time;
                          if (min === 0) {
                            time = hrs + ":" + min + "0";
                          } else {
                            time = hrs + ":" + min;
                          }
                          if (hrs != "NaN" && min != "NaN") {
                            setShowbreakClose((state) => !state);
                            var Break = breakTimings.slice(0, 9);
                            setBreakTimings(Break + time);
                          }
                        }
                      }}
                      display="clock"
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "80%",
    backgroundColor: "white",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  BoldText: {
    fontFamily: "open-sans-bold",
    margin: 10,
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
  textField: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
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
  },
  input: {
    width: "90%",
    height: "100%",
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
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    marginHorizontal: 5,
    fontFamily: "open-sans",
  },
});

export default EditDetailScreen;
