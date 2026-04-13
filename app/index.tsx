import { router, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Dashboard",
        headerStyle: {
          backgroundColor: "green",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }} />
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/brands")}
      >
        <Text style={styles.cardTitle}>Brands</Text>
        <Text>
          Manage and explore all medicine brands
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/medicines")}
      >
        <Text style={styles.cardTitle}>Medicines</Text>
        <Text>
          View and manage available medicines
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/categories")}
      >
        <Text style={styles.cardTitle}>Categories</Text>
        <Text>
          View and manage available medicine categories
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    color: "#111",
  },
});