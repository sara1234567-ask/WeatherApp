import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";

const API_KEY = "6dd5fb48c4140f50abf94af25379fbb9";

export default function ForecastScreen() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const lat = 43.238949;
        const lon = 76.889709;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&lang=ru&appid=${API_KEY}`
        );
        const data = await res.json();
        setForecast(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getForecast();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={forecast.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.day}>
              {new Date(item.dt * 1000).toLocaleDateString("ru-RU", { weekday: "long" })}
            </Text>
            <Text style={styles.temp}>{Math.round(item.temp.day)}°C</Text>
            <Text style={styles.desc}>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f0f8ff" },
  card: { padding: 15, marginBottom: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  day: { fontSize: 18, fontWeight: "bold", textTransform: "capitalize" },
  temp: { fontSize: 28, fontWeight: "300" },
  desc: { fontSize: 16, textTransform: "capitalize" },
});
