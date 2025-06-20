import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex items-center justify-center h-full"
    >
      <Text className="text-5xl text-light-300">Mweaoooooooo</Text>
      <Link href="/onbording">About</Link>
    </View>
  );
}
