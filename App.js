import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Image,ActivityIndicator,StyleSheet,ScrollView,Keyboard,} from "react-native";

const API_KEY = "6dd5fb48c4140f50abf94af25379fbb9"; 

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    Keyboard.dismiss();
    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
      );
      const currentData = await currentRes.json();
      if (currentData.cod !== 200) throw new Error(currentData.message);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
      );
      const forecastData = await forecastRes.json();

      setWeather(currentData);
      setForecast(forecastData.list.slice(0, 7)); 
    } catch (err) {
      setError("Город не найден ");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 WeatherApp</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Введите город..."
          placeholderTextColor="#a7a7a7ff"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={getWeather}>
          <Text style={styles.buttonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.name}</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
            }}
          />
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Text style={styles.details}>
            💨 {weather.wind.speed} м/с   🌡 {weather.main.humidity}% влажности
          </Text>
        </View>
      )}

      {forecast.length > 0 && (
        <View style={styles.forecast}>
          <Text style={styles.subtitle}>📅 Прогноз на ближайшее время</Text>
          {forecast.map((item, i) => (
            <View key={i} style={styles.forecastItem}>
              <Text style={styles.forecastTime}>
                {new Date(item.dt * 1000).toLocaleString("ru-RU", {
                  weekday: "short",
                  hour: "2-digit",
                })}
              </Text>
              <Image
                style={styles.forecastIcon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                }}
              />
              <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fffdfdff",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    marginBottom: 25,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    color: "#3c3737ff",
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0077b6",
    marginLeft: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  buttonText: { color: "#ffe4e4ff", fontSize: 22 },
  card: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  city: { fontSize: 28, fontWeight: "bold", color: "#ffffffff" },
  temp: { fontSize: 48, fontWeight: "bold", color: "#fff" },
  desc: { fontSize: 20, color: "#fff", marginVertical: 5, textTransform: "capitalize" },
  details: { color: "#eee", fontSize: 14, marginTop: 5 },
  icon: { width: 120, height: 120 },
  forecast: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 15,
    width: "100%",
  },
  subtitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 1,
  },
  forecastTime: { color: "#fff", width: 120, textTransform: "capitalize" },
  forecastTemp: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  forecastIcon: { width: 40, height: 40 },
  error: { color: "#fff", backgroundColor: "#ff6b6b", padding: 8, borderRadius: 10, marginTop: 15 },
});
