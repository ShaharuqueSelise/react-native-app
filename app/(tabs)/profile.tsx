import LineChartComp from "@/components/LineChartComp";
import useSavedMovies from "@/store/useSavedMovies";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView className="bg-black flex-1">
      {/* <Image
        source={images.bg}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      /> */}
      <ScrollView >
        <View className="flex-row justify-between items-center px-4 mt-8">
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Ionicons name="star-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="rounded-xl p-4 mt-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-red-500 justify-center items-center">
                <Text className="text-white font-bold">500</Text>
              </View>
              <View className="ml-3">
                <Text className="text-white font-semibold text-base">S&P500</Text>
                <Text className="text-gray-400 text-xs">SPX • SP</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-white font-bold text-3xl mt-4">$5,905.62 <Text className="text-base text-gray-300">USD</Text></Text>
          <Text className="text-red-400 font-semibold text-sm mt-1">-6.09 • -0.30% Today</Text>
        </View>

        <View className="mt-6">
          <LineChartComp/>
          {/* <CandleChartComp/> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
