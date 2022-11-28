import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function CardDetails() {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <AntDesign
          style={styles.backicon}
          name="arrowleft"
          size={28}
          color="#242F9B"
          onPress={() => navigation.navigate("LandingPage")}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/profile.jpg")}
          style={styles.image}
        />
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Campaign Owner:</Text>
          <Text style={styles.text2}>Saad</Text>
          <Text style={styles.text}>Title:</Text>
          <Text style={styles.text2}>Music Funds</Text>
          <Text style={styles.text}>Category:</Text>
          <Text style={styles.text2}>Music</Text>
          <Text style={styles.text}>Total Amount:</Text>
          <Text style={styles.text2}>2 ETH</Text>
          <Text style={styles.text}>Raised Amount:</Text>
          <Text style={styles.text2}>1 ETH</Text>
          <Text style={styles.text}>End Date:</Text>
          <Text style={styles.text2}>12-10-2022</Text>
          <Text style={styles.text}>Description:</Text>
        </View>
      </ScrollView>
      <View style={{ height: 300 }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    resizeMode: "stretch",
    width: 200,
    height: 200,
  },
  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    color: "#242F9B",
    marginTop: 10,
  },
  text2: {
    fontSize: 15,
    marginTop: 10,
  },
});
