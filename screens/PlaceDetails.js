import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { deletePlace, fetchPlaceDetails } from "../util/database";
import IconButton from "../components/UI/IconButton";

const PlaceDetails = ({ route, navigation }) => {
  const [selectedPlaceData, setSelectedPlaceData] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("fullScreenMap", {
      initialLatitude: selectedPlaceData.location.latitude,
      initialLongitude: selectedPlaceData.location.longitude,
    });
  };

  const onDeleteHandler = () => {
    Alert.alert("Are you sure?", "This can't be undone!", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deletePlace(selectedPlaceId);
          Alert.alert("Place deleted");
          navigation.navigate("AllPlaces");
        },
        style: "destructive",
      },
    ]);
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setSelectedPlaceData(place);
      navigation.setOptions({
        title: place.title,
        headerRight: () => (
          <IconButton
            color={Colors.accent600}
            name="trash"
            size={24}
            onPress={onDeleteHandler}
          />
        ),
      });
    };
    loadPlaceData();
  }, [selectedPlaceId, setSelectedPlaceData]);

  if (!selectedPlaceData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image
        style={styles.image}
        source={{ uri: selectedPlaceData.imageURI }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlaceData.address}</Text>
        </View>
        <OutlinedButton name="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 72,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    color: Colors.primary200,
    textAlign: "center",
  },
});
