import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

function TabIcon({ focused, icon, title, color }: any) {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor={color || "#A8B5DB"} />
        </View>
    );
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {

                },
                tabBarStyle: {
                    backgroundColor: "#010314",
                    paddingHorizontal: 15,
                    marginHorizontal: 20,
                    borderRadius: 60,
                    marginBottom: 44,
                    height: 54,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#010314",
                    position: "absolute",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="save"
                options={{
                    title: "Save",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} icon={icons.save} title="Save" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    // tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search" color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabLayout