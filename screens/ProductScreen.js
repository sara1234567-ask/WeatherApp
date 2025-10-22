
import React, { useContext, useState } from "react";
import { View, Text, Image, ScrollView, Button, TextInput, Alert } from "react-native";
import { ShopContext } from "../contexts/ShopContext";

export default function ProductScreen({ route }) {
  const { item } = route.params;
  const { addToCart, reviews, addReview, user } = useContext(ShopContext);
  const [text, setText] = useState("");

  const productReviews = reviews[item.id] || [];

  const handleAddReview = () => {
    const name = user?.name || "Гость";
    if (!text.trim()) return Alert.alert("Ошибка", "Отзыв пустой");
    addReview(item.id, { name, text: text.trim(), date: new Date().toISOString() });
    setText("");
    Alert.alert("Спасибо", "Отзыв добавлен (локально)");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: 260, borderRadius: 8, marginBottom: 12 }} resizeMode="cover" />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{item.title}</Text>
      <Text style={{ marginVertical: 8 }}>{item.description}</Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.price}$</Text>

      <View style={{ marginTop: 12 }}>
        <Button title="Добавить в корзину" onPress={() => { addToCart(item); Alert.alert("В корзину", "Товар добавлен"); }} />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Отзывы</Text>
        {productReviews.length === 0 ? <Text>Пока нет отзывов</Text> : productReviews.map((r, i) => (
          <View key={i} style={{ paddingVertical: 6, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "700" }}>{r.name} • {new Date(r.date).toLocaleString()}</Text>
            <Text>{r.text}</Text>
          </View>
        ))}

        <TextInput
          placeholder="Написать отзыв..."
          value={text}
          onChangeText={setText}
          style={{ borderWidth: 1, borderColor: "#ddd", padding: 8, marginTop: 8, borderRadius: 6, backgroundColor: "#fff" }}
        />
        <View style={{ marginTop: 8 }}>
          <Button title={user ? "Отправить отзыв" : "Войти чтобы оставить отзыв"} onPress={() => {
            if (!user) return Alert.alert("Требуется вход", "Перейдите на экран Профиль и войдите");
            handleAddReview();
          }} />
        </View>
      </View>
    </ScrollView>
  );
}
