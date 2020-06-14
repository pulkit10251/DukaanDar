import React, { memo } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Colors from "../../constants/Colors";
import Imagess from "../../constants/Imagess";

const FrontImages = (props) => {
  const offers = props.shop_Offers;

  const offersExisting = Imagess.FrontList;

  const newList = [...offers, ...offersExisting];
  return (
    <View>
      <View style={styles.welcome}>
        <Image
          source={{
            uri: Imagess.welcome,
          }}
          style={styles.welcomeImage}
        />
      </View>

      <View style={styles.Offers}>
        <SliderBox
          dotColor={Colors.primary}
          images={newList}
          paginationBoxVerticalPadding={5}
          autoplay={true}
          circleLoop={true}
          resizeMode="stretch"
          ImageComponentStyle={{
            borderRadius: 10,
            width: "95%",
            marginVertical: 10,
          }}
          paginationBoxStyle={styles.BoxStyle}
          dotStyle={styles.dotStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    width: "100%",
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#888",
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
  },
  Offers: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  BoxStyle: {
    bottom: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)",
  },
});

export default memo(FrontImages);
