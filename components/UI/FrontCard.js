import React ,{memo} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import ExploreItemBox from "./ExploreItemBox";
import Colors from "../../constants/Colors";

const FrontCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.exploreText}>
        Explore our {props.name}
      </Text>
      <FlatList
        horizontal
        data={props.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.prod_Id)}
        renderItem={(itemData) => (
          <TouchableCmp
            onPress={() => props.navigation(itemData.item, props.data)}
          >
            <View style={styles.box}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: itemData.item.prod_ImageUrl }}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </View>
              <Text style={styles.text}>{itemData.item.prod_Name}</Text>
            </View>
          </TouchableCmp>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
  },
  box: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backgroundColor: Colors.primary,
  },
  exploreText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  imageContainer: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
    marginTop:5,
    alignItems:'center',
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    flex:1,
  },
  text: {
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "auto",
    textAlign: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default memo(FrontCard);
