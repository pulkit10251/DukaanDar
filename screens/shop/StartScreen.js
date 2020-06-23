import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  Alert,
} from "react-native";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as ShopIDAction from "../../store/actions/ShopIdAction";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";

import ModalView from "../../components/UI/ModalView";

const StartScreen = (props) => {
  const dispatch = useDispatch();

  const addedShops = useSelector((state) => {
    const shopData = [];
    for (const key in state.store.shops) {
      shopData.push(state.store.shops[key].shopData);
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
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => dispatch(ShopStoreActions.removeStore(shopId)),
        },
      ],
      { cancelable: false }
    );

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
          dispatch(ShopStoreActions.addStore("G7745X"));
        }}
        title="clickme"
      />
      <ModalView
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        shopId={shopId}
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
