import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

const AllScreen = (props) => {
  const CategoryNavigate = (id) => {
    props.navigation.navigate("Category", {
      shopId: id,
    });
  };
  const shopId = props.navigation.getParam("shopId");

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableCmp onPress={() => CategoryNavigate(shopId)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Categories</Text>
          </View>
        </TouchableCmp>
        <TouchableCmp>
          <View style={styles.searchBar}>
              <Ionicons name={Platform.OS==="android"?"md-search" : "ios-search"} size={16} color="#888" style={styles.iconStyle} />
            <Text style={styles.searchText} >Search for products</Text>
          </View>
        </TouchableCmp>
      </View>
      <ScrollView>
        <View style={styles.offerView}>
          
        </View>
      </ScrollView>
    </View>
  );
};

AllScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    elevation: 0.2,
    flexDirection: "row",
  },
  button: {
    width: "27%",
    height: 35,
    backgroundColor: "white",
    margin: 7,
    borderRadius: 2,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: Dimensions.get("screen").width * 0.04,
    fontFamily: "open-sans-bold",
  },
  searchBar: {
      width:'65%',
      height:35,
      backgroundColor:'white',
      borderRadius:2,
      marginVertical:7,
      marginRight:7,
      flexDirection:'row',
      alignItems:'center',
      marginLeft:'auto',
  },
  iconStyle:{
      marginHorizontal:10,
      opacity:0.6
  },
  searchText:{
    fontFamily:'open-sans',
    color:'#888',
    fontSize:14,
  },
  offerView:{
    width:'100%',
    height: 200,
    backgroundColor:'white'
  }
});


export default AllScreen;
