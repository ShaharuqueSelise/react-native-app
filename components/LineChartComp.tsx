import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const LineChartComp = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  
  // Sample data showing a declining trend like in the image
  const chartData = {
    labels: ['20:00', '21:00', '22:00', '23:00', '00:00', '01:00'],
    datasets: [
      {
        data: [5020, 4080, 4500, 8000, 770,5020, 3080, 4500, 8800, 1770],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red color
        strokeWidth: 2,
      },
    ],
  };

  // Y-axis values for glassmorphism labels
  const yAxisValues = [5920, 5880, 5840, 5800, 5770,];

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
    labelColor: (opacity = 1) => `transparent`, // Hide default labels
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'transparent', // No background strokes
      strokeWidth: 2,
    },
    fillShadowGradient: '#ef4444',
    fillShadowGradientOpacity: 0.1,
  };

  const periods = ['1D', '5D', '1M', '3M', '6M', '1Y', 'All'];

  // Create the area fill path for light red background below line
  const createAreaPath = () => {
    const data = chartData.datasets[0].data;
    const chartWidth = screenWidth; // Match LineChart width exactly
    const chartHeight = 200; // Match LineChart height exactly
    
    // LineChart internal padding (these are the actual values used by react-native-chart-kit)
    const paddingLeft = 0;
    const paddingRight = 0;
    const paddingTop = 0;
    const paddingBottom = 0;
    
    const plotWidth = chartWidth - paddingLeft - paddingRight;
    const plotHeight = chartHeight - paddingTop - paddingBottom;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1; // Prevent division by zero
    
    // Start from bottom-left of the plot area
    let path = `M ${paddingLeft} ${chartHeight - paddingBottom}`;
    
    // Draw line following the data points
    data.forEach((value, index) => {
      const x = paddingLeft + (index * plotWidth) / (data.length - 1);
      const y = paddingTop + ((maxValue - value) / range) * plotHeight;
      path += ` L ${x} ${y}`;
    });
    
    // Close the path by going to bottom-right and back to start
    path += ` L ${paddingLeft + plotWidth} ${chartHeight - paddingBottom}`;
    path += ` L ${paddingLeft} ${chartHeight - paddingBottom} Z`;
    
    return path;
  };

  return (
    <View className="bg-black p-4 rounded-lg mt-4">
      {/* Chart Container with Background */}
      <View className="mb-6 relative">
        {/* SVG Background Area - positioned absolutely to match LineChart exactly */}
        <View className="absolute inset-0">
          <Svg 
            width={screenWidth - 32} 
            height={200}
            style={{
              marginVertical: 8,
            }}
          >
            <Defs>
              <LinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                <Stop offset="100%" stopColor="rgba(37, 23, 23, 0.05)" />
              </LinearGradient>
            </Defs>
            <Path
              d={createAreaPath()}
              fill="url(#areaGradient)"
            />
          </Svg>
        </View>

        {/* Spacer to maintain height */}
        <View style={{ height: 216, width: screenWidth - 32 }} />

        {/* Glassmorphism Y-Axis Labels on Chart */}
        <View className="absolute left-2 top-0 bottom-0 justify-between py-8 pointer-events-none">
          {yAxisValues.map((value, index) => (
            <View
              key={value}
              className="px-2 py-1 rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="text-white text-xs font-medium">
                {value.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Glassmorphism X-Axis Labels on Chart */}
        <View className="absolute bottom-2 left-0 right-0 flex-row justify-between px-16 pointer-events-none">
          {chartData.labels.map((label, index) => (
            <View
              key={label}
              className="px-2 py-1 rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="text-white text-xs font-medium">
                {label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Time Period Selector */}
      <View className="flex-row justify-between items-center">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: selectedPeriod === period 
                    ? 'rgba(59, 130, 246, 0.8)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  borderColor: selectedPeriod === period 
                    ? 'rgba(59, 130, 246, 0.5)' 
                    : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedPeriod === period
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <TouchableOpacity 
          className="ml-4 p-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Ionicons name="expand-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LineChartComp;