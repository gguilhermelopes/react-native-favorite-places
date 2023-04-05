import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useState } from "react";

const LocationPicker = () => {
  const [loading, setLoading] = useState(false);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

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
    console.log(location);
  };
  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}>
        {loading && (
          <ActivityIndicator size="large" color={Colors.primary700} />
        )}
      </View>
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
  },
  actionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 32,
  },
});
