import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceForm from "../components/Places/PlaceForm";

const AddPlaces = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", {
      place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;

const styles = StyleSheet.create({});
