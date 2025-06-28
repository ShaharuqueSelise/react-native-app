import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [searched, setSearched] = useState('');
  const router = useRouter();
  const { data: movies, isPending: moviesPending, error: moviesError } = useFetch(() => fetchMovies({ query: "" }))

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-black flex-1 flex justify-center items-center">
        <Text className="text-white font-bold">Coming Soon...</Text>
      </SafeAreaView >
    </SafeAreaProvider>
  );
}
