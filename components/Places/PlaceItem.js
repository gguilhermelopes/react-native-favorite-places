import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: place.imageURI }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.primary300,
    marginVertical: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: Colors.primary800,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 16,
  },
  title: {
    fontFamily: "dm-sans-bold",
    fontSize: 18,
    marginBottom: 6,
    color: Colors.primary900,
  },
  address: {
    fontFamily: "dm-sans",
    fontSize: 12,
    color: Colors.primary900,
  },
});
