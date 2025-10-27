import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CurrentWeatherScreen from "../screens/CurrentWeatherScreen";
import ForecastScreen from "../screens/ForecastScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Current" component={CurrentWeatherScreen} options={{ title: "Погода сейчас" }} />
        <Stack.Screen name="Forecast" component={ForecastScreen} options={{ title: "Прогноз на 7 дней" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
