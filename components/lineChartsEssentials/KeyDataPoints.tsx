import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TradingDataCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Key data points</Text>
      
      <View style={styles.dataRow}>
        <Text style={styles.label}>Market cap</Text>
        <Text style={styles.value}>2.001 USD</Text>
      </View>
      
      <View style={styles.dataRow}>
        <Text style={styles.label}>Volume</Text>
        <Text style={styles.value}>26.95M</Text>
      </View>
      
      <View style={styles.dataRow}>
        <Text style={styles.label}>Previous close</Text>
        <Text style={styles.value}>$172.38</Text>
      </View>
      
      <View style={styles.dataRow}>
        <Text style={styles.label}>Open</Text>
        <Text style={styles.value}>$171.78</Text>
      </View>
      
      <View style={styles.dataRow}>
        <Text style={styles.label}>Day range</Text>
        <Text style={styles.value}>$171.78 - $175.40</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 8,
    margin: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#333333',
    borderBottomColor: '#333333',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '400',
  },
  value: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TradingDataCard;