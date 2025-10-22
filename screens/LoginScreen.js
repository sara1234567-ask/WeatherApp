
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { ShopContext } from "../contexts/ShopContext";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(ShopContext);
  const [name, setName] = useState("");

  const doLogin = () => {
    if (!name.trim()) return Alert.alert("Введите имя");
    setUser({ name: name.trim() });
    Alert.alert("Вход выполнен", `Привет, ${name.trim()}!`);
    navigation.navigate("Profile");
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>Фейковый вход</Text>
      <TextInput placeholder="Имя" value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6, marginBottom: 10, backgroundColor: "#fff" }} />
      <Button title="Войти" onPress={doLogin} />
    </View>
  );
}
