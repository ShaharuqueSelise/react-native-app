import { images } from "@/constants/images";
import useSavedMovies from "@/store/useSavedMovies";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { savedMovies, removeMovie } = useSavedMovies();
  const fakeUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    followers: 1200,
    following: 185,
    bio: "Full-stack developer passionate about React Native, Web3, and UI/UX design. Coffee enthusiast ☕️",
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="items-center mb-6">
          <Image
            source={{ uri: fakeUser.avatar }}
            className="w-28 h-28 rounded-full mb-4"
          />

          <Text className="text-white text-xl font-bold">{fakeUser.name}</Text>
          <Text className="text-gray-400 text-sm">{fakeUser.email}</Text>
        </View>

        <View className="flex-row justify-around mb-6">
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{fakeUser.followers}</Text>
            <Text className="text-gray-400 text-sm">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{fakeUser.following}</Text>
            <Text className="text-gray-400 text-sm">Following</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-white font-bold mb-2">Bio</Text>
          <Text className="text-gray-300 text-sm leading-5">{fakeUser.bio}</Text>
        </View>

        {
          savedMovies?.length > 0 && (
            <View className="mb-6">
              <Text className="text-white font-bold mb-3">Watchlist</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {savedMovies?.map((movie) => (
                  <View key={movie.id} className="mr-4 items-center">
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                      className="w-24 h-36 rounded-md"
                      resizeMode="cover"
                    />
                    <Text className="text-gray-300 text-xs mt-1 w-24 text-center" numberOfLines={1}>
                      {movie.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )
        }

        <TouchableOpacity className={`bg-accent ${savedMovies?.length > 0 && 'mt-6'} py-3 rounded-lg items-center mb-3`}>
          <Text className="text-white font-semibold text-base">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-dark-100 py-3 rounded-lg items-center flex-row justify-center gap-x-2">
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text className="text-white font-semibold text-base">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
