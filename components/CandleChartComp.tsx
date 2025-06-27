import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Rect, Stop } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const CandleChartComp = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');

  // Sample candlestick data matching the image pattern
  const candleData = [
    { time: '21:00', open: 8.485, high: 7.520, low: 5.470, close: 15.500 },
    { time: '21:30', open: 1.500, high: 5.540, low: 0.485, close: 5.525 },
    { time: '22:00', open: 2.525, high: 5.580, low: 3.2, close: 4.570 },
    { time: '22:30', open: 5.570, high: 5.600, low: 5.540, close: 4.590 },
    { time: '23:00', open: 5.590, high: 5.620, low: 5.575, close: 10.610 },
    { time: '23:30', open: 5.610, high: 5.650, low: 5.595, close: 0.635 },
    { time: '00:00', open: 4.685, high: 4.720, low: 3.670, close: 6.705 },
    { time: '00:30', open: 1.665, high: 2.700, low: 1.650, close: 6.685 },
    { time: '01:00', open: 4.685, high: 7.720, low: 3.670, close: 6.705 },
    { time: '01:30', open: 4.705, high: 7.750, low: 6.690, close: 7.735 },
    { time: '02:00', open: 4, high: 5.26, low: 3.366, close: 10 },
    { time: '02:30', open: 3.760, high: 4.800, low: 3.745, close: 4.785 },
    { time: '03:00', open: 5.785, high: 6.820, low: 3.770, close: 6.805 },
    { time: '03:30', open: 6.805, high: 10.850, low: 2.790, close: 8.830 },
    { time: '04:00', open: 0.830, high: 1.870, low: 4.815, close: 1.855 },
    { time: '04:30', open: 4.855, high: 1.890, low: 4.840, close: 5.875 },
    { time: '05:00', open: 4.875, high: 10.910, low: 2.860, close: 6.895 },
    { time: '05:30', open: 3.895, high: 6.930, low: 2.880, close: 1.915 },
  ];

  const periods = ['1D', '5D', '1M', '3M', '6M', '1Y', 'All'];

  // Y-axis values matching the image
  const yAxisValues = [10.920, 8.880, 6.840, 4.800, 2.760, 1.720, 1.680];

  // Chart dimensions
  const chartWidth = screenWidth;
  const chartHeight = 300;
  const paddingLeft = 5;
  const paddingRight = 0;
  const paddingTop = 20;
  const paddingBottom = 100;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate min/max for scaling
  const allValues = candleData.flatMap(d => [d.open, d.high, d.low, d.close]);
  const minValue = Math.min(...allValues) - 0.01;
  const maxValue = Math.max(...allValues) + 0.01;
  const range = maxValue - minValue;

  // Helper function to convert price to Y coordinate
  const priceToY = (price: any) => {
    return paddingTop + ((maxValue - price) / range) * plotHeight;
  };

  // Helper function to convert index to X coordinate
  const indexToX = (index: any) => {
    return paddingLeft + (index * plotWidth) / (candleData.length - 1);
  };

  // Render individual candlestick
  const renderCandlestick = (data: any, index: any) => {
    const x = indexToX(index);
    const candleWidth = 7;

    const openY = priceToY(data.open);
    const closeY = priceToY(data.close);
    const highY = priceToY(data.high);
    const lowY = priceToY(data.low);

    const isGreen = data.close > data.open;
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.abs(closeY - openY);

    return (
      <React.Fragment key={index}>
        {/* High-Low line (wick) */}
        <Line
          x1={x}
          y1={highY}
          x2={x}
          y2={lowY}
          stroke={isGreen ? '#82F6BD' : '#E97257'}
          strokeWidth="1"
        />

        {/* Candlestick body */}
        <Rect
          x={x - candleWidth / 2}
          y={bodyTop}
          width={candleWidth}
          height={bodyHeight || 1}
          fill={isGreen ? '#82F6BD' : '#E97257'}
          stroke={isGreen ? '#82F6BD' : '#E97257'}
          strokeWidth="1"
        />
      </React.Fragment>
    );
  };

  return (
    <View>
      {/* Chart Container */}
      <View className="rounded-lg px-4">
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
              <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </LinearGradient>
          </Defs>

          {/* Horizontal grid lines */}
          {yAxisValues.map((value, index) => {
            const y = indexToX(6);
            return (
              <Line
                key={`grid-${index}`}
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="0.8"
                strokeDasharray="1,6"
              />
            );
          })}

          {/* Vertical grid lines */}
          {candleData.map((_, index) => {
            if (index % 3 === 0) {
              const x = indexToX(index);
              return (
                <Line
                  key={`vgrid-${index}`}
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={chartHeight - paddingBottom}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="0.5"
                />
              );
            }
            return null;
          })}

          {/* Candlesticks */}
          {candleData.map((data, index) => renderCandlestick(data, index))}
        </Svg>

        {/* Y-axis labels */}
        <View className="absolute left-2 top-4 bottom-10 justify-between">
          {yAxisValues.map((value, index) => (
            <View
              key={`y-label-${index}`}
              className="px-2 py-1 rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.23)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(90px)',
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
              <Text className="text-white text-xs font-mono">
                {value.toFixed(3)}
              </Text>
            </View>
          ))}
        </View>


      </View>

      {/* Controls positioned between y-axis and x-axis labels */}
      <View className="px-2 flex-row justify-between items-center">
        {/* Volume and Expand icons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="p-2 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Text className="text-white text-lg">📊</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-2 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Text className="text-white text-lg">⛶</Text>
          </TouchableOpacity>
        </View>

        {/* Expand button */}
        <TouchableOpacity
          className="p-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Text className="text-white text-lg">⤢</Text>
        </TouchableOpacity>
      </View>

      {/* X-axis labels */}
      <View className="px-2 mt-4 flex-row justify-between">
        {candleData.map((data, index) => {
          if (index % 3 === 0) {
            return (
              <View
                key={`x-label-${index}`}
                className="px-2 py-1 rounded-md"
              >
                <Text className="text-white text-xs font-mono">
                  {data.time}
                </Text>
              </View>
            );
          }
          return null;
        })}
      </View>

      {/* Time Period Selector */}
      <View className="px-2 mt-4 flex-row justify-between items-center">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: selectedPeriod === period
                    ? 'rgba(241, 241, 241, 0.8)'
                    : 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  borderColor: selectedPeriod === period
                    ? 'rgba(241, 241, 241, 0.8)'
                    : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text
                  className={`text-sm font-medium ${selectedPeriod === period
                    ? 'text-black'
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

export default CandleChartComp;