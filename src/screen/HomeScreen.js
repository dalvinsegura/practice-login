import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();

  let name = "";
  (async () => {
    name = await AsyncStorage.getItem("name");
    // console.log("name", name);
  })();
  console.log("name outside", name);
  return (
    <View style={{ marginTop: 200 }}>
      <Text style={{ color: "#000" }}>{name}</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
};

export default HomeScreen;
