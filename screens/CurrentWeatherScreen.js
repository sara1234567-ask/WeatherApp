import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";

const API_KEY = "6dd5fb48c4140f50abf94af25379fbb9";

export default function CurrentWeatherScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const lat = 43.238949; 
        const lon = 76.889709;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
      <Button title="Прогноз на 7 дней" onPress={() => navigation.navigate("Forecast")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#e0f7fa" },
  city: { fontSize: 26, fontWeight: "bold" },
  temp: { fontSize: 60, fontWeight: "300", marginVertical: 10 },
  desc: { fontSize: 20, textTransform: "capitalize" },
});
