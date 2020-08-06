import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ProfileActions from "../../store/actions/ProfileAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  let openImagePickerAsync = async (setImage, userId, setLoading) => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
    });

    if (!pickerResult.cancelled) {
      setLoading(true);
      await uploadImage(pickerResult.uri, userId).catch((error) => {
        console.log(error.message);
      });
      getImageUrl(setImage);
      setLoading(false);
    }
  };

  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("Customers/" + userId + "/");

    return ref.put(blob);
  };

  const getImageUrl = (setImage) => {
    let ref = firebase.storage().ref("Customers/" + userId);
    ref
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        dispatch(ProfileActions.uploadImageUrl(url));
      })
      .catch((error) => {
        console.log(error.message);
        return "Something went Wrong!";
      });
  };

  const profileData = useSelector((state) => state.profile.profileData);
  const url =
    profileData.url === undefined
      ? "https://images-na.ssl-images-amazon.com/images/I/71H%2BvwjlSnL._AC_SX425_.jpg"
      : profileData.url;

  const [image, setImage] = useState(url);
  const [loading, setLoading] = useState(false);

  const userId = profileData.uid;

  return (
    <View style={styles.container}>
      <View style={styles.design}>
        <View style={styles.imageOutsideContainer}>
          <TouchableOpacity
            onLongPress={() => {
              openImagePickerAsync(setImage, userId, setLoading);
            }}
          >
            <View style={styles.imageContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="stretch"
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 120 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.NameText}>{profileData.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Email : </Text>
          <Text style={styles.text}>{profileData.email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Contact Number : </Text>
          <Text style={styles.text}>{profileData.contact}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  design: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: 200,
    elevation: 1,
    borderBottomEndRadius: 200,
    alignItems: "center",
  },
  imageOutsideContainer: {
    width: 200,
    aspectRatio: 1,
    position: "absolute",
    borderRadius: 75,
    top: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 185,
    aspectRatio: 1,
    borderRadius: 70,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#888",
    overflow: "hidden",
  },
  NameText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textTransform: "uppercase",
  },
  textContainer: {
    flexDirection: "row",
    margin: 10,
  },
  textBold: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
    textTransform: "capitalize",
  },
});

ProfileScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Your Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProfileScreen;
