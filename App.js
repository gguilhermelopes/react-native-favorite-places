import { useCallback, useEffect } from "react";
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

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "dm-sans": require("./assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView onLayout={onLayoutRootView} style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: "dm-sans-bold",
              },
              headerStyle: {
                backgroundColor: Colors.primary800,
                alignItems: "center",
              },
              headerTintColor: Colors.primary100,
              contentStyle: {
                backgroundColor: Colors.primary700,
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
                title: "Add a new place!",
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
