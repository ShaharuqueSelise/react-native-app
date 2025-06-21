import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [searched, setSearched] = useState('');
  const router = useRouter();
  const { data: movies, isPending: moviesPending, error: moviesError } = useFetch(() => fetchMovies({ query: "" }))

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary flex-1">
        <Image
          source={images.bg}
          className="absolute max-w-full z-0 bg-cover bg-center"
          resizeMode="cover"
        />
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: '100%',
            paddingBottom: 10,
          }}
        >
          <Image
            source={icons.logo}
            className="w-12 h-10 mt-20 mx-auto mb-5"
          />


          {
            moviesPending ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) :
              moviesError ? (
                <Text>Error: {moviesError}</Text>
              )
                :
                <View className="flex-1 mt-5">
                  <SearchBar
                    placeholder="Search for a movie, tv show or person"
                    onChangeText={
                      (text) => setSearched(text)
                    } />

                  {/* Optional: Display what you're typing for debugging */}
                  {searched.length > 0 && (
                    <View className="mt-4 p-3 bg-dark-200 rounded-full">
                      <Text className="text-white text-sm">
                        Keyword: "{searched}"
                      </Text>
                    </View>
                  )}

                  <>
                    <Text className="text-lg text-white font-bold mt-5 mb-3">
                      Latest Movies
                    </Text>

                    <FlatList
                      data={movies}
                      renderItem={({ item }) => <MovieCard item={item}/>}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 20,
                        paddingRight: 5,
                        marginBottom: 10,
                      }}
                      className="mt-2 pb-32"
                      scrollEnabled={false}
                    />
                  </>
                </View>
          }
        </ScrollView>
      </SafeAreaView >
    </SafeAreaProvider>
  );
}
