import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  const isLogged = async () => {
    const result = await AsyncStorage.getItem("token");
    console.log("allItem: ", await AsyncStorage.getAllKeys());
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  if (isLogged()) {
    navigation.navigate("Home");
  } else {
  }

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
