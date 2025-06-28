import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EarningsWidget = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Quarterly');

    const data = [
        { period: 'Q2\'24', actual: 3.8, estimate: 3.6 },
        { period: 'Q3\'24', actual: 4.2, estimate: 4.0 },
        { period: 'Q1\'25', actual: 5.8, estimate: 5.4 },
        { period: 'Q2\'25', actual: 5.6, estimate: 5.2 },
        { period: 'Q3\'25', actual: 6.2, estimate: 5.8 }
    ];

    const maxValue = 8;

    return (
        <LinearGradient
            colors={['#373941', '#18191D', '#18191D']} style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Earnings</Text>

            {/* Period Toggle */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, styles.toggleLeft, selectedPeriod === 'Annually' && styles.activeButton]}
                    onPress={() => setSelectedPeriod('Annually')}
                >
                    <Text style={[styles.toggleText, selectedPeriod === 'Annually' && styles.activeText]}>
                        Annually
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, styles.toggleRight, selectedPeriod === 'Quarterly' && styles.activeButton]}
                    onPress={() => setSelectedPeriod('Quarterly')}
                >
                    <Text style={[styles.toggleText, selectedPeriod === 'Quarterly' && styles.activeText]}>
                        Quarterly
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
                {/* Y-axis labels */}
                <View style={styles.yAxisLabels}>
                    <Text style={styles.yAxisText}>8.00</Text>
                    <Text style={styles.yAxisText}>6.00</Text>
                    <Text style={styles.yAxisText}>4.00</Text>
                    <Text style={styles.yAxisText}>2.00</Text>
                    <Text style={styles.yAxisText}>0.00</Text>
                </View>

                {/* Chart area */}
                <View style={styles.chartArea}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((index) => (
                        <View
                            key={`grid-${index}`}
                            style={[
                                styles.gridLine,
                                {
                                    bottom: (index / 4) * 120
                                }
                            ]}
                        />
                    ))}

                    {/* X-axis line */}
                    <View style={styles.xAxisLine} />

                    {data.map((item, index) => (
                        <View key={index} style={styles.dataColumn}>
                            {/* Data points container */}
                            <View style={styles.dataPointsContainer}>
                                {/* Actual value dot */}
                                <View
                                    style={[
                                        styles.actualDot,
                                        {
                                            bottom: (item.actual / maxValue) * 120
                                        }
                                    ]}
                                />
                                {/* Estimate value dot */}
                                <View
                                    style={[
                                        styles.estimateDot,
                                        {
                                            bottom: (item.estimate / maxValue) * 120
                                        }
                                    ]}
                                />
                            </View>

                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.chartArea}>
                {data.map((item, index) => (
                    <Text key={index} style={styles.periodLabel}>{item.period}</Text>
                ))}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={styles.actualLegendDot} />
                    <Text style={styles.legendText}>Actual</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={styles.estimateLegendDot} />
                    <Text style={styles.legendText}>Estimate</Text>
                </View>
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next earning report</Text>
                    <Text style={styles.detailValue}>July 30, 2025</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Report period</Text>
                    <Text style={styles.detailValue}>Q2 2025</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>EPS estimate</Text>
                    <Text style={styles.detailValue}>$0.46 USD</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Revenue Estimate</Text>
                    <Text style={styles.detailValue}>$23.13 B</Text>
                </View>
            </View>

            {/* More Details Button */}
            <TouchableOpacity>
                <LinearGradient
                    className='flex-row items-center justify-center p-3'
                    colors={['#373941', '#18191D', '#18191D']}
                    style={{ opacity: 0.67, borderRadius: 8, borderWidth: 1, borderColor: '#A1A6BF' }}
                >
                    <Text className="text-white text-sm font-medium mr-2">More Details</Text>
                    <ArrowRight size={16} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D3037',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 16,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 8
    },
    toggleButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#3A3D45',
    },
    toggleLeft: {
        borderRadius: 6,
    },
    toggleRight: {
        borderRadius: 6,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    toggleText: {
        color: '#8B8B8B',
        fontSize: 14,
    },
    activeText: {
        color: '#2D3037',
    },
    chartContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        height: 140,
    },
    yAxisLabels: {
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginRight: 15,
    },
    yAxisText: {
        color: '#8B8B8B',
        fontSize: 12,
    },
    chartArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 20,
    },
    dataColumn: {
        alignItems: 'center',
        flex: 1,
    },
    dataPointsContainer: {
        height: 120,
        width: 20,
        position: 'relative',
        marginBottom: 8,
    },
    actualDot: {
        width: 18,
        height: 18,
        borderRadius: 20,
        backgroundColor: '#4FD1C7',
        position: 'absolute',
        left: 12,
    },
    estimateDot: {
        width: 18,
        height: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4FD1C7',
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 4,
    },
    periodLabel: {
        color: '#8B8B8B',
        fontSize: 12,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        gap: 16,
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actualLegendDot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#4FD1C7',
    },
    estimateLegendDot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4FD1C7',
        backgroundColor: 'transparent',
    },
    legendText: {
        color: '#C0C0C0',
        fontSize: 12,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        color: '#8B8B8B',
        fontSize: 14,
    },
    detailValue: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    moreDetailsButton: {
        backgroundColor: '#3A3D45',
        borderRadius: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    moreDetailsText: {
        color: '#C0C0C0',
        fontSize: 14,
    },
    arrow: {
        color: '#C0C0C0',
        fontSize: 14,
    },
    gridLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#444',
        position: 'absolute',
    },
    xAxisLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#444',
        position: 'absolute',
        bottom: 0,
    },
});

export default EarningsWidget;