import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleSubmition = ({ username, password }) => {
    console.log("username", username);
    console.log("password", password);
    axios({
      method: "post",
      url: "https://psychedelic-gossamer-snowboard.glitch.me/login",
      data: {
        username: username,
        password: password,
      },
    }).then((res) => {
      AsyncStorage.setItem("token", JSON.stringify(res.data.token));
      AsyncStorage.setItem("name", JSON.stringify(res.data.name));
      if (res.status === 200) {
        navigation.navigate("Home");
      } else {
        alert("Wrong username or password");
      }
    });
  };

  const validationLoginSchema = Yup.object().shape({
    username: Yup.string().min(3).required(),
    password: Yup.string().required(),
  });

  const ButtonCustomize = ({
    handleSubmition,
    titleButton,
    isLogin = true,
  }) => (
    <Button
      onPress={handleSubmition}
      title={titleButton}
      color={isLogin ? "#03F" : "#A23"}
    />
  );

  return (
    <View style={Styles.FormLoginContainer}>
      <Text>LoginScreen</Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationLoginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <TextInput
              name="username"
              value={values.username}
              onChangeText={handleChange("username")}
              handleBlur={handleBlur("username")}
              style={Styles.FormLoginInput}
              placeholder="Username"
            />
            <Text>{errors.username}</Text>
            <TextInput
              name="password"
              onChangeText={handleChange("password")}
              handleBlur={handleBlur("password")}
              value={values.password}
              style={Styles.FormLoginInput}
              placeholder="Password"
            />
            <Text>{errors.password}</Text>
            <ButtonCustomize
              handleSubmition={() =>
                handleSubmition({
                  username: values.username,
                  password: values.password,
                })
              }
              titleButton="Login"
              isLogin={false}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const Styles = StyleSheet.create({
  FormLoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  FormLoginInput: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  FormLoginButton: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
