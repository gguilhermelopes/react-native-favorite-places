import { Alert, Button, Image, StyleSheet, View, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";

const ImagePicker = () => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [imagePreview, setImagePreview] = useState("");

  const verifyPermission = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient Permissions!",
        "You need to grant camera permissions to use the app"
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    setImagePreview(image.assets[0].uri);
  };

  let showImagePreview = (
    <Text style={styles.imagePreviewText}>See image preview here!</Text>
  );

  if (imagePreview) {
    showImagePreview = (
      <Image style={styles.image} source={{ uri: imagePreview }} />
    );
  }
  return (
    <View>
      <View style={styles.imageWrapper}>{showImagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    height: 325,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary200,
  },
  imagePreviewText: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 6,
  },
});
