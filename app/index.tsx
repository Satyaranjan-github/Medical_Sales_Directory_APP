import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Index() {

  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { height: height }]}>
      <Text>bolo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1
  }
})
