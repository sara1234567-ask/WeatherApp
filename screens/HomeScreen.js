
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Button, TextInput } from "react-native";
import { ShopContext } from "../contexts/ShopContext";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { cart } = useContext(ShopContext);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        const cats = Array.from(new Set((data.products || []).map(p => p.category)));
        setCategories(cats);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = filter ? products.filter(p => p.category === filter) : products;

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#f5f5f5" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>🛍️ MiniShop</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title={`Корзина (${cart.length})`} onPress={() => navigation.navigate("Cart")} />
          <View style={{ width: 8 }} />
          <Button title="Профиль" onPress={() => navigation.navigate("Profile")} />
        </View>
      </View>

      <TextInput
        placeholder="Фильтр по категории или пусто для всех"
        value={filter}
        onChangeText={setFilter}
        style={{ borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 8, marginBottom: 8, backgroundColor: "#fff" }}
      />

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setFilter("")} style={{ padding: 6, borderRadius: 6, borderWidth: 1, marginRight: 6, marginBottom: 6 }}>
          <Text>Все</Text>
        </TouchableOpacity>
        {categories.map(cat => (
          <TouchableOpacity key={cat} onPress={() => setFilter(cat)} style={{ padding: 6, borderRadius: 6, borderWidth: 1, marginRight: 6, marginBottom: 6 }}>
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={visible}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Product", { item })}
              style={{ flexDirection: "row", backgroundColor: "#fff", marginVertical: 6, borderRadius: 8, padding: 10, alignItems: "center" }}
            >
              <Image source={{ uri: item.thumbnail }} style={{ width: 70, height: 70, borderRadius: 8, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontWeight: "700" }}>{item.title}</Text>
                <Text>{item.price}$ • {item.category}</Text>
              </View>
              <Text style={{ fontWeight: "700" }}>{item.rating ?? "—"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
