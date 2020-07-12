import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Switch } from "react-native-gesture-handler";
import * as ShopActions from "../../store/actions/ShopAction";

const ShopDetailScreen = (props) => {
  const CategoryNavigate = (shopId) => {
    props.navigation.navigate("Global", {
      shopId: shopId,
    });
  };
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const shopId = props.navigation.getParam("shopId");
  const shop = useSelector((state) =>
    state.shops.ShopData.find((shop) => shop.shop_Id === shopId)
  );

  const dispatch = useDispatch();

  const shopData = useSelector((state) => state.shops.ShopData);

  useEffect(() => {
    dispatch(ShopActions.addServer(shopData));
  }, [dispatch, shopData]);

  const Time = (time) => {
    const T = time.split(":");
    var newTime;
    var hours = parseInt(T[0]);
    var AmorPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    newTime = hours + ":" + T[1] + " " + AmorPm;
    return newTime;
  };

  const time = (openTime, closeTime, breakTime) => {
    const OpenTime = Time(openTime);
    const CloseTime = Time(closeTime);
    var timings;
    if (breakTime === "None") {
      timings = OpenTime + " to " + CloseTime;
    } else {
      const Break = breakTime.split(" to ");
      const btime1 = Time(Break[0]);
      const btime2 = Time(Break[1]);
      timings =
        OpenTime + " - " + btime1 + " and " + btime2 + " - " + CloseTime;
    }
    return timings;
  };

  const Timings = time(
    shop.shop_OpenTimings,
    shop.shop_ClosedTimings,
    shop.shop_BreakTimings
  );

  const [status, setStatus] = useState("");
  const [Color, setColor] = useState("red");

  const current_status = (
    openTime,
    closeTime,
    breakTime,
    setStatus,
    setColor
  ) => {
    const curr_date =
      new Date().getMonth() +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear();

    const curr_time = new Date().getHours() + ":" + new Date().getMinutes();
    const curr = new Date(curr_date + " " + curr_time);
    const open = new Date(curr_date + " " + openTime);
    const close = new Date(curr_date + " " + closeTime);
    var Status, Color;
    if (days(shop.shop_OpenDays)) {
      Status = "CLOSED";
      Color = "red";
    } else {
      if (breakTime === "None") {
        if (curr >= open && curr <= close) {
          Status = "OPEN";
          Color = "green";
        } else {
          Status = "CLOSED";
          Color = "red";
        }
      } else {
        const Break = breakTime.split(" to ");
        const breakstart = new Date(curr_date + " " + Break[0]);
        const breakend = new Date(curr_date + " " + Break[1]);

        if (
          (curr >= open && curr <= breakstart) ||
          (curr >= breakend && curr <= close)
        ) {
          Status = "OPEN";
          Color = "green";
        } else {
          Status = "CLOSED";
          Color = "red";
        }
      }
    }

    setColor(Color);
    setStatus(Status);
  };

  useEffect(() => {
    current_status(
      shop.shop_OpenTimings,
      shop.shop_ClosedTimings,
      shop.shop_BreakTimings,
      setStatus,
      setColor
    );
    const timer = setInterval(() => {
      current_status(
        shop.shop_OpenTimings,
        shop.shop_ClosedTimings,
        shop.shop_BreakTimings,
        setStatus,
        setColor
      );
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const days = (data) => {
    const All = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var li;
    switch (data) {
      case "Everyday":
        li = "Everyday";
        break;
      case "Open except Monday":
        li = "Monday";
        break;
      case "Open except Sunday":
        li = "Sunday";
        break;
      case "Open except Saturday":
        li = "Saturday";
        break;
    }
    const currday = All[new Date().getDay()];
    if (li === "Everyday") {
      return false;
    } else if (li === currday) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    props.navigation.setParams({ shopId: shopId });
  }, []);

  return (
    <ScrollView>
      <View style={styles.image}>
        <View style={styles.backgroundImage}>
          <Image
            style={styles.shopImage}
            source={{ uri: shop.shop_ShopImage }}
          />
        </View>
        <View style={styles.overlayImage}>
          <Image
            style={styles.shopkeeperImage}
            source={{ uri: shop.shop_ShopkeeperImage }}
          />
        </View>
      </View>
      <View style={styles.textView}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.description}>"{shop.shop_Description}"</Text>
      </View>
      <View style={styles.timingContainer}>
        <View style={styles.timings}>
          <Text style={styles.timingsText}>Open Days :</Text>
          <Text style={styles.block1}>{shop.shop_OpenDays}</Text>
        </View>
        <View style={styles.timings}>
          <Text style={styles.timingsText}>Timings : </Text>
          <Text style={styles.block1}>{Timings}</Text>
        </View>
        <View style={styles.timings}>
          <Text style={styles.timingsText}>Current Status : </Text>
          <Text
            style={{
              color: Color,
              margin: Dimensions.get("screen").height * 0.005,
              fontFamily: "open-sans-bold",
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableCmp onPress={() => CategoryNavigate(shopId)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Your Categories</Text>
          </View>
        </TouchableCmp>
      </View>
    </ScrollView>
  );
};

ShopDetailScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Your Shop",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            const shopId = NavData.navigation.getParam("shopId");
            NavData.navigation.navigate("EditShop", {
              shopId: shopId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  block: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  backgroundImage: {
    width: "95%",
    height: Dimensions.get("screen").height * 0.65,
    marginTop: 10,
    alignItems: "center",
  },
  shopImage: {
    width: "95%",
    height: Dimensions.get("screen").height * 0.5,
    opacity: 0.7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
  overlayImage: {
    position: "absolute",
    top:
      Dimensions.get("screen").height * 0.5 -
      (Dimensions.get("screen").width * 0.5) / 2,
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").width * 0.5,
  },
  shopkeeperImage: {
    width: "100%",
    height: "100%",
    borderRadius: 360,
    borderWidth: 5,
    borderColor: "black",
    overflow: "visible",
  },
  textView: {
    alignItems: "center",
  },
  heading: {
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontSize: 22,
  },
  description: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    textAlign: "center",
    color: "#888",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 22,
    textAlign: "center",
    marginHorizontal: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  timingContainer: {
    marginVertical: 10,
  },
  timings: {
    flexDirection: "row",
  },
  timingsText: {
    fontFamily: "open-sans-bold",
    margin: Dimensions.get("screen").height * 0.005,
  },
  block1: {
    fontFamily: "open-sans",
    margin: Dimensions.get("screen").height * 0.005,
  },
});

export default ShopDetailScreen;
