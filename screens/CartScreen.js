
import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Button, Alert } from "react-native";
import { ShopContext } from "../contexts/ShopContext";

export default function CartScreen() {
  const { cart, removeFromCart, placeOrder } = useContext(ShopContext);

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return Alert.alert("Корзина пустая");
    const order = placeOrder();
    Alert.alert("Заказ оформлен", `Спасибо! Сумма: ${order.total}$`);
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>Корзина</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.product.id.toString()}
        ListEmptyComponent={<Text>Корзина пуста</Text>}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8, backgroundColor: "#fff", padding: 8, borderRadius: 8 }}>
            <Image source={{ uri: item.product.thumbnail }} style={{ width: 60, height: 60, borderRadius: 6, marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700" }}>{item.product.title}</Text>
              <Text>{item.qty} × {item.product.price}$</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.product.id)} style={{ padding: 8 }}>
              <Text>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Итого: {total}$</Text>
        <View style={{ marginTop: 8 }}>
          <Button title="Оформить покупку" onPress={handleCheckout} />
        </View>
      </View>
    </View>
  );
}
