import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import useSavedMovies from "@/store/useSavedMovies";


interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { saveMovie, removeMovie, isSaved } = useSavedMovies();

  const handleSave = () => {
    if (isSaved((movie as any)?.id)) {
      removeMovie((movie as any)?.id);
    } else {
      saveMovie((movie as any));
    }
  };
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, isPending } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (isPending)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#030014' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${(movie as any)?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{(movie as any)?.title}</Text>
          <View className="flex-row items-center justify-between mt-2">
            {/* Release year and runtime */}
            <View className="flex-row items-center space-x-1">
              <Text className="text-light-200 text-sm">
                {(movie as any)?.release_date?.split("-")[0]} •
              </Text>
              <Text className="text-light-200 text-sm">{(movie as any)?.runtime}m</Text>
            </View>

            {/* Save button */}
            <TouchableOpacity
              className="rounded-full w-9 h-9 bg-white items-center justify-center ml-2"
              onPress={handleSave}
            >
              <Ionicons
                name={isSaved((movie as any)?.id) ? "bookmark" : "bookmark-outline"}
                size={20}
                color="#898AC4"
              />
            </TouchableOpacity>
          </View>


          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round((movie as any)?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({(movie as any)?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={(movie as any)?.overview} />
          <MovieInfo
            label="Genres"
            value={(movie as any)?.genres?.map((g: any) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${((movie as any)?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                ((movie as any)?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              (movie as any)?.production_companies?.map((c: any) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-16 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;