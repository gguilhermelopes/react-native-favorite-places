import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

const PlaceForm = () => {
  const [input, setInput] = useState("");

  const changeTitleHander = (enteredInput) => {
    setInput(enteredInput);
  };
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.form}>
      <Text style={styles.label}>Location Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={changeTitleHander}
        value={input}
      />
      <ImagePicker />
      <LocationPicker />
      <Button>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  form: {
    flex: 1,
  },
  label: {
    fontFamily: "dm-sans-bold",
    color: Colors.primary200,
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary200,
    color: Colors.primary800,
    fontFamily: "dm-sans",
  },
});
