import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import UserContext from "./context/userContext";
const { height, width } = Dimensions.get("window");
let Usertoken;

export default function SignIn() {
  const navigation = useNavigation();
  const { token, userdata, setToken, setUserData } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    await fetch("http://10.135.49.31:3001/funderr/auth", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Usertoken = data
        setToken(data)
      })
      .catch((err) => {
        console.log(err);
      });

      await fetch("http://10.135.49.31:3001/funderr/currentuser",{
        headers:{
          "x-auth-token": Usertoken,
        },
        method: "GET"
      }).then((res)=>res.json())
      .then((data)=>{
        console.log("User: ",JSON.stringify(data))
        const newUser = data
        setUserData(newUser);
        setTimeout(() => {
          navigation.navigate("LandingPage")
        }, 3000);
      })
    // setTimeout(() => {
    //   navigation.navigate("LandingPage");
    // }, 1000);
  //   axios
  //     .post("http://192.168.10.5:3001/funderr/auth", data)
  //     .then((result) => {
  //       // Usertoken = result.data;
  //       // setToken(Usertoken);
  //       console.log("Result:", result.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //   toast.error("Wrong Email or Password", {
  //     position: toast.POSITION.TOP_LEFT,
  //   });
  //   });
  //   setTimeout(() => {
  //     navigation.navigate("LandingPage");
  //   }, 2000);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <AntDesign
        style={styles.backicon}
        name="arrowleft"
        size={28}
        color="#242F9B"
        onPress={() => navigation.navigate("MainPage")}
      />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 40,
          fontWeight: "bold",
          marginLeft: "10%",
        }}
      >
        Funderr
      </Text>
      <Text
        style={{
          color: "#242F9B",
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: "10%",
        }}
      >
        Log In to Funderr
      </Text>
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "10%",
          marginLeft: "10%",
        }}
      >
        Email
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.email}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "5%",
          marginLeft: "10%",
        }}
      >
        Password
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.email}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <TouchableOpacity
        style={styles.signupbuttoncontainer}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.signupbutton}>Sign In</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "#242F9B",
          fontWeight: "bold",
          fontSize: 15,
          margin: "10%",
        }}
      >
        Or Sign In with{" "}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: "37%",
          bottom: 75,

          width: "10%",
        }}
      >
        <AntDesign name="google" size={35} color="#242F9B" />
      </TouchableOpacity>
      <Text
        style={{
          color: "#242F9B",
          fontWeight: "bold",
          fontSize: 15,
          marginLeft: "10%",
          bottom: "7%",
        }}
      >
        Or Sign In with{" "}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: "37%",
          bottom: 80,

          width: "10%",
        }}
      >
        <AntDesign name="facebook-square" size={35} color="#242F9B" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignContent: "center",
    justifyContent: "center",
  },

  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    bottom: 40,
  },
  email: {
    marginLeft: "10%",
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 40,
    width: "75%",
    marginTop: "2%",
    borderRadius: 10,
  },
  signupbuttoncontainer: {
    backgroundColor: "#242F9B",
    height: "7%",
    borderRadius: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "13%",
    marginTop: "5%",
  },
  signupbutton: {
    color: "white",
  },
});
