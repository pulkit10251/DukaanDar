import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as ShopIDAction from "../../store/actions/ShopIdAction";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";
import * as ShopActions from "../../store/actions/ShopAction";

import ModalView from "../../components/UI/ModalView";
import Colors from "../../constants/Colors";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      Alert.alert("Turn on notifications", "Go to settings", [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "ok",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
      const { status: ExistingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = ExistingStatus;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const StartScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //     }
  //   );

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      await dispatch(ShopActions.fetchShop());
      try {
        await dispatch(ShopStoreActions.fetchCustomerData());
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetch();
  }, [dispatch, customerData]);

  const customerData = useSelector((state) => state.store.shops);
  const ShopData = useSelector((state) => state.shops.ShopData);

  const addedShops = useSelector((state) => {
    const shopData = [];
    for (const key in state.store.shops) {
      const shop = ShopData.find((item) => item.shop_Id === key);
      shopData.push(shop);
    }
    return shopData.sort((a, b) => (a.shop_Id > b.shop_Id ? 1 : -1));
  });

  const [shopId, setShopId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setShopId("");
    setIsModalVisible((state) => !state);
  };

  useEffect(() => {
    props.navigation.setParams({
      toggleModal: toggleModal,
    });
  }, []);

  const QRScannerNavigate = () => {
    setIsModalVisible(false);
    props.navigation.navigate("QR", {
      setShopId: setShopId,
      setIsModalVisible: setIsModalVisible,
    });
  };

  const IntroNavigate = (id, shopName) => {
    props.navigation.navigate("Intro", {
      shopId: id,
      shopTitle: shopName,
    });
  };

  const createTwoButtonAlert = (shopId) =>
    Alert.alert(
      "Are you sure?",
      "All the items present in cart will also be deleted!!!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(ShopStoreActions.removeStore(shopId));
            dispatch(ShopStoreActions.addCustomerData());
          },
        },
      ],
      { cancelable: false }
    );

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={addedShops}
        keyExtractor={(item) => item.shop_Id}
        renderItem={(itemData) => (
          <Card
            shopName={itemData.item.shop_Name}
            deleteShop={() => createTwoButtonAlert(itemData.item.shop_Id)}
            GotoShopping={() => {
              dispatch(ShopIDAction.shopId(itemData.item.shop_Id));
              IntroNavigate(itemData.item.shop_Id, itemData.item.shop_Name);
            }}
          />
        )}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          "Click on the Add Button on the Extreme right{"\n"} to Add new Shops"
        </Text>
      </View>

      <ModalView
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        shopId={shopId}
        ShopData={ShopData}
        setShopId={setShopId}
        navigate={QRScannerNavigate}
        setModalVisibility={setIsModalVisible}
        dispatch={dispatch}
      />
    </View>
  );
};

StartScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={NavData.navigation.getParam("toggleModal")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
  },
});

export default StartScreen;
