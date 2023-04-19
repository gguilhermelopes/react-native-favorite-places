import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    latitude: route.params.initialLatitude,
    longitude: route.params.initialLongitude,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : -23.1865,
    longitude: initialLocation ? initialLocation.longitude : -46.8845,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = ({ nativeEvent }) => {
    if (initialLocation) return;
    const { latitude, longitude } = nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLatitude: selectedLocation.latitude,
      pickedLongitude: selectedLocation.longitude,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={24}
          color={Colors.accent500}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
