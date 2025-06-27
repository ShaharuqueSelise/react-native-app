import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ChevronRight, Plus } from 'lucide-react-native';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const CandleChartBottom = () => {
    const renderTabButton = (title: any, isActive = false) => (
        <TouchableOpacity>
            <BlurView
                intensity={isActive ? 50 : 10}
                style={[
                    styles.blurContainer,
                    isActive && { borderColor: '#fff', backgroundColor: '#fff', opacity: 1 }
                ]}
                className="px-4 py-2 mr-2"
            >
                <Text className={`text-sm ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                    {title}
                </Text>
            </BlurView>
        </TouchableOpacity>
    );

    const renderDataRow = (label: any, value: any, valueColor = 'text-white') => (
        <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-400 text-sm">{label}</Text>
            <Text className={`text-sm font-medium ${valueColor}`}>{value}</Text>
        </View>
    );

    const TechnicalGauge = () => {
        const size = 180;
        const strokeWidth = 16;
        const radius = (size - strokeWidth) / 2;
        const centerX = size / 2;
        const centerY = size / 2;

        // Create semicircle path segments
        const createArcPath = (startAngle: any, endAngle: any, radius: any, centerX: any, centerY: any) => {
            const start = polarToCartesian(centerX, centerY, radius, endAngle);
            const end = polarToCartesian(centerX, centerY, radius, startAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

            return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
        };

        const polarToCartesian = (centerX: any, centerY: any, radius: any, angleInDegrees: any) => {
            const angleInRadians = (angleInDegrees - 0) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };

        // Needle position pointing to the right (toward buy)
        const needleAngle = 315; // degrees
        const needleLength = radius - 8;
        const needleEnd = polarToCartesian(centerX, centerY, needleLength, needleAngle);

        return (
            <View className="items-center py-4">
                {/* Neutral label at top */}
                <Text className="text-gray-400 text-sm mb-4">Neutral</Text>

                {/* Labels positioned around the gauge */}
                <View className="relative">
                    {/* Left labels */}
                    <View className="absolute top-2 left-[-20]">
                        <Text className="text-gray-400 text-xs">Sell</Text>
                    </View>
                    <View className="absolute left-[-60] top-20">
                        <Text className="text-gray-400 text-xs">Strong sell</Text>
                    </View>

                    {/* Right labels */}
                    <View className="absolute top-2 right-[-20]">
                        <Text className="text-gray-400 text-xs">Buy</Text>
                    </View>
                    <View className="absolute right-[-60] top-20">
                        <Text className="text-gray-400 text-xs">Strong buy</Text>
                    </View>

                    {/* SVG Gauge in center */}
                    <Svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
                        {/* Background track */}
                        <Path
                            d={createArcPath(180, 360, radius, centerX, centerY)}
                            stroke="#4B5563"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />

                        {/* Left side - Strong Sell + Sell (Blue) */}
                        <Path
                            d={createArcPath(180, 270, radius, centerX, centerY)}
                            stroke="#0EA5E9"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Center - Neutral (Cyan/Teal) */}
                        <Path
                            d={createArcPath(270, 315, radius, centerX, centerY)}
                            stroke="#06B6D4"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Needle */}
                        <Line
                            x1={centerX}
                            y1={centerY}
                            x2={needleEnd.x}
                            y2={needleEnd.y}
                            stroke="#FFFFFF"
                            strokeWidth={2}
                            strokeLinecap="round"
                        />

                        {/* Center dot */}
                        <Circle
                            cx={centerX}
                            cy={centerY}
                            r={3}
                            fill="#FFFFFF"
                        />
                    </Svg>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 px-2 mt-8 mb-[12%]">
            <View>
                {/* Header Tabs */}
                <View className="flex-row mb-8">
                    {renderTabButton('Overview', true)}
                    {renderTabButton('News')}
                    {renderTabButton('Marks')}
                    {renderTabButton('Ideas')}
                </View>

                {/* News Card */}
                <TouchableOpacity className="bg-black rounded-lg mb-4">
                    <LinearGradient
                        colors={['#6776A7', '#899ACD', '#4A5476']}
                        style={{ borderRadius: 8 }}
                    >
                        <View className="flex-row items-start px-4 py-2">
                            <View className="flex-1">
                                <Text className="text-xs text-white mb-2">
                                    24/7 Wall St • 6 hours ago
                                </Text>
                                <Text className="text-white text-sm font-medium leading-5">
                                    Amazon (AMZN) and Alphabet (GOOGL) Are The Cheapest Trillion-Dollar Stocks Today
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Add Notes */}
                <TouchableOpacity className="flex-row items-center justify-between bg-[#151519] rounded-lg border border-gray-800 p-3 mb-10">
                    <View className="flex-row items-center">
                        <Plus size={16} color="#9CA3AF" />
                        <Text className="text-gray-400 text-sm ml-2">Add notes</Text>
                    </View>
                    <ChevronRight size={16} color="#9CA3AF" />
                </TouchableOpacity>

                {/* Key Data Points */}
                <View className="border-t border-b border-gray-800 rounded-lg p-4 mb-10">
                    <Text className="text-white text-lg font-semibold mb-4">Key data points</Text>

                    {renderDataRow('Market cap:', '2.06T USD')}
                    {renderDataRow('Volume:', '26.85M')}
                    {renderDataRow('Previous close:', '$173.38')}
                    {renderDataRow('Open:', '$171.78')}
                    {renderDataRow('Day range:', '$171.78 - $175.40')}
                </View>

                {/* Technicals */}
                <LinearGradient
                    colors={['#373941', '#18191D', '#18191D']}
                    style={{ borderRadius: 8, margin: 4, borderWidth: 1, borderColor: '#374151', }}
                >

                    <View className=" p-4 mb-4">
                        <Text className="text-white text-lg font-semibold mb-2">Technicals</Text>

                        <TechnicalGauge />

                        <TouchableOpacity>
                            <LinearGradient
                                className='flex-row items-center justify-center p-3 mt-4'
                                colors={['#373941', '#18191D', '#18191D']}
                                style={{ opacity: 0.67, borderRadius: 8, borderWidth: 1, borderColor: '#A1A6BF' }}
                            >
                                <Text className="text-white text-sm font-medium mr-2">More Details</Text>
                                <ArrowRight size={16} color="#FFFFFF" />
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>
            </View>
        </View>
    );
};

export default CandleChartBottom;



export const styles = StyleSheet.create({
    blurContainer: {
        borderRadius: 5,
        overflow: 'hidden', // Important for blur to be clipped
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5, // For Android shadows
        backgroundColor: '#2D3037', // Semi-transparent background
        opacity: 0.8
    },
});
