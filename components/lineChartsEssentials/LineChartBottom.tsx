import { ChevronRight, Plus } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const FinancialDashboard = () => {
  const renderTabButton = (title:any, isActive = false) => (
    <TouchableOpacity
      className={`px-4 py-2 rounded-lg mr-2 ${
        isActive ? 'bg-white' : 'bg-gray-700'
      }`}
    >
      <Text className={`text-sm ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderDataRow = (label:any, value:any, valueColor = 'text-white') => (
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
    const createArcPath = (startAngle:any, endAngle:any, radius:any, centerX:any, centerY:any) => {
      const start = polarToCartesian(centerX, centerY, radius, endAngle);
      const end = polarToCartesian(centerX, centerY, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };
    
    const polarToCartesian = (centerX:any, centerY:any, radius:any, angleInDegrees:any) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
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
          <View className="absolute top-8 left-[-30]">
            <Text className="text-gray-400 text-xs">Sell</Text>
          </View>
          <View className="absolute left-[-60] top-20 right-2">
            <Text className="text-gray-400 text-xs">Strong sell</Text>
          </View>
          
          {/* Right labels */}
          <View className="absolute right-[-30] top-8 ">
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
    <View className="flex-1 px-2 mt-12 mb-[12%]">
      <View>
        {/* Header Tabs */}
        <View className="flex-row mb-4">
          {renderTabButton('Overview', true)}
          {renderTabButton('News')}
          {renderTabButton('Marks')}
          {renderTabButton('Ideas')}
        </View>

        {/* News Card */}
        <TouchableOpacity className="bg-blue-600 rounded-lg p-4 mb-4">
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="text-xs text-blue-200 mb-1">
                24/7 Wall St • 6 hours ago
              </Text>
              <Text className="text-white text-sm font-medium leading-5">
                Amazon (AMZN) and Alphabet (GOOGL) Are The Cheapest Trillion-Dollar Stocks Today
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Add Notes */}
        <TouchableOpacity className="flex-row items-center justify-between py-3 mb-4">
          <View className="flex-row items-center">
            <Plus size={16} color="#9CA3AF" />
            <Text className="text-gray-400 text-sm ml-2">Add notes</Text>
          </View>
          <ChevronRight size={16} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Key Data Points */}
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-4">Key data points</Text>
          
          {renderDataRow('Market cap:', '2.06T USD')}
          {renderDataRow('Volume:', '26.85M')}
          {renderDataRow('Previous close:', '$173.38')}
          {renderDataRow('Open:', '$171.78')}
          {renderDataRow('Day range:', '$171.78 - $175.40')}
        </View>

        {/* Technicals */}
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-2">Technicals</Text>
          
          <TechnicalGauge />
          
          <TouchableOpacity className="bg-gray-700 rounded-lg p-3 mt-4 flex-row items-center justify-center">
            <Text className="text-white text-sm font-medium mr-2">More Details</Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FinancialDashboard;