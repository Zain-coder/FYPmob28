import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Image, Platform } from "react-native";
// import DatePicker from '@react-native-community/datetimepicker';
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

import axios from "axios";

export default function SignUp() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState("");
  const [date, setDate] = useState('09-10-2020');
  const [picture, setPicture] = useState(null);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      EndDate: '',
      WalletAddress: '',
      Amount:'',
      Description:''
    }
  });
  const onSubmit = async (data) => {
    const fData = new FormData();
    const ext = image?.split(".").pop();
    const filename = `${data.name}.${ext}`;
    const file = {
      uri: image,
      name: filename,
      type: `image/${ext}`,
    };
    console.log(data);
    await handleUpload(file);
    data.role = "user";
    data.picture = picture;
    // console.log("Data: ", data);
    // fData.append("name", data.name);
    // fData.append("email", data.email);
    // fData.append("password", data.password);
    // fData.append("role", "user");
    // fData.append("picture", picture);
    // console.log(fData);
  //   fetch("http://10.135.49.31:3001/funderr/register", {
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //       //   // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setTimeout(() => {
  //     navigation.navigate("SignIn");
  //   }, 1000);
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "funderrApp");
    data.append("cloud_name", "dfmhxmauj");

    await fetch("https://api.cloudinary.com/v1_1/dfmhxmauj/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Picture: ", data.url);
        setPicture(data.url);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log("image",result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //console.log('errors', errors);
  return (
    <View style={styles.container}>
   
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "2%",
          marginLeft: "10%",
        }}
      >
        Title
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
        name="Title"
        rules={{ required: true }}
      />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "2%",
          marginLeft: "10%",
        }}
      >
       EndDate
      </Text>

      <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "2%",
          marginLeft: "10%",
        }}
      >
        WalletAddress
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
        name="WalletAddress"
        rules={{ required: true }}
      />
        <Text
        style={{
          color: "#242F9B",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Category
      </Text>
      {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        boxStyles={{
          borderRadius: 30,
          width: 300,
          marginTop: 10,
          borderColor: "#242F9B",
        }}
      /> */}

      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "2%",
          marginLeft: "10%",
        }}
      >
        Amount
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
        name="Amount"
        rules={{ required: true }}
      />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "2%",
          marginLeft: "10%",
        }}
      >
        Description
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
        name="Description"
        rules={{ required: true }}
      />

      <TouchableOpacity style={styles.imagebutton} onPress={pickImage}>
        <Text style={{ color: "#242F9B" }}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupbuttoncontainer}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.signupbutton}>Create Campaign</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },

  backicon: {
    marginTop: 40,
    marginLeft: 10,
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
  imagebutton: {
    width: 130,
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#242F9B",
  },
});
