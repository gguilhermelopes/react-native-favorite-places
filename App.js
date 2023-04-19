import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import { SafeAreaView, StyleSheet } from "react-native";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "dm-sans": require("./assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await init();
        await SplashScreen.preventAutoHideAsync();
        setDbInitialized(true);
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded & !dbInitialized) {
    return null;
  }
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView onLayout={onLayoutRootView} style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: "dm-sans-bold",
              },
              headerStyle: {
                backgroundColor: Colors.primary900,
                alignItems: "center",
              },
              headerTintColor: Colors.accent500,
              contentStyle: {
                backgroundColor: Colors.primary800,
              },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    name="add"
                    size={24}
                    onPress={() => navigation.navigate("AddPlaces")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlaces"
              component={AddPlaces}
              options={{
                title: "Add a new place",
              }}
            />
            <Stack.Screen
              name="fullScreenMap"
              component={Map}
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{
                title: "Loading place...",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
