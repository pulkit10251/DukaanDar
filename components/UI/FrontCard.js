import React, { memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import FrontBox from "./FrontBox";

const FrontCard = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exploreText}>Explore our {props.name}</Text>
      <FlatList
        horizontal
        data={props.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.prod_Id)}
        renderItem={(itemData) => (
          <FrontBox
            url={itemData.item.prod_ImageUrl}
            name={itemData.item.prod_Name}
            data={props.data}
            prod={itemData.item}
            navigation={props.navigation}
          />
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

  exploreText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});

export default memo(FrontCard);
