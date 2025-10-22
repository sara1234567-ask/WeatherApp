import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { ShopContext } from "../contexts/ShopContext";

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(ShopContext);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Привет, {user.name}</Text>
          <View style={{ marginTop: 12 }}>
            <Button title="Выйти" onPress={() => setUser(null)} />
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Вы не вошли</Text>
          <Button title="Войти" onPress={() => navigation.navigate("Login")} />
        </>
      )}
    </View>
  );
}
