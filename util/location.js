import { Alert } from "react-native";

const GOOGLE_API_KEY = "AIzaSyD4R1IDAyulh8KdcEVQ8pz73xwOALWNyy0";

export const getMapPreview = (latitude, longitude) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

  return imagePreviewURL;
};

export const getAddress = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}&language`
    );
    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
  } catch (error) {
    Alert.alert("Fetch failed", error);
  }
};
