import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
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

const StartScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await dispatch(ShopActions.fetchShop());
      await dispatch(ShopStoreActions.fetchCustomerData());
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
      <Button
        onPress={() => {
          dispatch(ShopStoreActions.addStore("15C5GS"));
          // dispatch(ShopStoreActions.addStore("15C5GT"))
          dispatch(ShopStoreActions.addStore("G7745X"));
          dispatch(ShopStoreActions.addCustomerData());
        }}
        title="clickme"
      />
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
