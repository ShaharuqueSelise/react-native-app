import { images } from "@/constants/images";
import useSavedMovies from "@/store/useSavedMovies";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const { savedMovies, removeMovie } = useSavedMovies();

  return (
    <SafeAreaView className="bg-primary flex-1">
       <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView className="px-5 my-10">
        <Text className="text-white font-bold text-xl my-4">Favourite Movies</Text>
        {savedMovies.length === 0 ? (
          <Text className="text-gray-500">No saved movies yet.</Text>
        ) : (
          savedMovies.map((movie) => (
            <View key={movie.id} className="mb-5 flex-row items-center gap-4">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                className="w-20 h-28 rounded"
              />
              <View className="flex-1">
                <Link href={`/movie/${movie.id}`} asChild>
                  <TouchableOpacity>
                    <Text className="text-white font-bold text-base">{movie.title}</Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity onPress={() => removeMovie(movie.id)}>
                  <Text className="text-red-400 mt-1">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Save;
