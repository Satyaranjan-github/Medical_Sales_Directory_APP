import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Brands"
        onPress={() => router.push({
          pathname: "/brands",
        })}
      />
      <Button
        title="Go to Medicines"
        onPress={() => router.push({
          pathname: "/medicines",
        })}
      />
    </View>
  );
}