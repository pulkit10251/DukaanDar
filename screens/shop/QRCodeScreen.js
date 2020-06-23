import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Flatlist,
  Button,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRCodeScreen = (props) => {
  const setShopId = props.navigation.getParam("setShopId");
  const setIsModalVisible = props.navigation.getParam("setIsModalVisible");

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShopId(data);
    setIsModalVisible(true);
    props.navigation.pop();

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
    </BarCodeScanner>
  );
};

QRCodeScreen.navigationOptions = (NavData) => {
  return {
    headerShown: false,
  };
};

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layerTop: {
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    backgroundColor: opacity,
  },
  layerCenter: {
    height: Dimensions.get("screen").height / 3,
    width: "100%",
    flexDirection: "row",
  },
  layerLeft: {
    height: "100%",
    width:
      (Dimensions.get("screen").width - Dimensions.get("screen").height / 3) /
      2,
    backgroundColor: opacity,
  },
  focused: {
    height: "100%",
    width: Dimensions.get("screen").height / 3,
  },
  layerRight: {
    height: "100%",
    width:
      (Dimensions.get("screen").width - Dimensions.get("screen").height / 3) /
      2,
    backgroundColor: opacity,
  },
  layerBottom: {
    height: Dimensions.get("screen").height / 3,
    width: "100%",
    backgroundColor: opacity,
  },
});
export default QRCodeScreen;
