import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "indigo" }}>Thu Ra Lynn Htun</Text>
      <Link href={"/(auth)/signup"}>Signup</Link>
      <Link href={"/(auth)"}>Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
