import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../model/place";

const PlaceForm = ({ onCreatePlace }) => {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const changeTitleHander = (enteredInput) => {
    setInput(enteredInput);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    if ((pickedLocation, selectedImage, input)) {
      const placeData = new Place(input, selectedImage, pickedLocation);
      onCreatePlace(placeData);
    } else {
      Alert.alert(
        "Missing information!",
        "You must select an image, title and location in order to add a place."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.form}>
      <Text style={styles.label}>Location Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={changeTitleHander}
        value={input}
      />
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
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
    color: Colors.accent500,
    marginBottom: 4,
  },
  input: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary200,
    color: Colors.primary800,
    fontFamily: "dm-sans-bold",
  },
});
