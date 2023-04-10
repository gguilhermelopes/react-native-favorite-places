import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import getMapPreview from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = () => {
  const [loading, setLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        latitude: route.params.pickedLatitude,
        longitude: route.params.pickedLongitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const verifyPermissions = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient Permissions!",
        "You need to grant location permissions to use the app"
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    setLoading(true);
    const location = await getCurrentPositionAsync();
    setLoading(false);
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };
  const pickOnMapHandler = () => {
    navigation.navigate("fullScreenMap");
  };

  let mapPreview = (
    <Text style={styles.mapPreviewText}>No location picked yet!</Text>
  );

  if (loading) {
    mapPreview = <ActivityIndicator size="large" color={Colors.primary700} />;
  }

  if (pickedLocation && !loading) {
    mapPreview = (
      <Image
        style={styles.mapImage}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actionsWrapper}>
        <OutlinedButton name="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton name="map" onPress={pickOnMapHandler}>
          Open Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 325,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary200,
    overflow: "hidden",
  },
  actionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPreviewText: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
  },
});
