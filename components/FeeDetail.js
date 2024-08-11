import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/colors/colors';


export default FeeDetail = ({ navigation, route }) => {
    var pAmount = route.params.pAmount;
    var participant = route.params.participant;
    participant.shuttlecocks = participant.shuttlecocks ? participant.shuttlecocks : [];
    participant.otherFee = participant.otherFee ? participant.otherFee : [];
    var hours = route.params.hours;
    var allShuttlecocks = route.params?.allShuttlecocks ? route.params.allShuttlecocks : [];
    var allOtherFees = route.params?.allOtherFees ? route.params.allOtherFees : [];

    return (
        <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <View style={styles.Body}>
                <Header
                    title="Fee details"
                    subtitle={'Participant: ' + participant.name}
                    onBackPress={() => navigation.goBack()}
                />
                <View style={participant.totalFee > 0 ? styles.totalPosWrapper : styles.totalNegWrapper}>
                    <Text style={participant.totalFee > 0 ? styles.totalPosText : styles.totalNegText}>{participant.totalFee > 0 ? 'Pay' : 'Collect'}: RM{Math.abs(participant.totalFee).toFixed(2)}</Text>
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Court fee:</Text>
                    <View style={styles.sectionListWrapper}>
                        {
                            hours.map((hour) => (
                                <View key={hour.id} style={styles.ListItemWrapper}>
                                    <View style={styles.ListItemTop}>
                                        <Text style={styles.itemTitle}>{hour.time}</Text>
                                        <Text style={hour.price > 0 ? styles.itemPos : styles.itemNeg}>{hour.price > 0 ? '+' : '-'}RM{(hour.court * hour.price / hour.attendance.length).toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.ListItemBottomWrapper}>
                                        <Text style={styles.ListItemBottomImp}>{hour.court} </Text>
                                        <Text style={styles.ListItemBottomNor}>courts x </Text>
                                        <Text style={styles.ListItemBottomImp}>{hour.price.toFixed(2)} </Text>
                                        <Text style={styles.ListItemBottomNor}>rental ÷ </Text>
                                        <Text style={styles.ListItemBottomImp}>{hour.attendance.length} </Text>
                                        <Text style={styles.ListItemBottomNor}>participant</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.subTotalWrapper}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={participant.courtFee > 0 ? styles.subTotalPos : styles.subTotalNeg}>{participant.courtFee > 0 ? '+' : '-'}RM{participant.courtFee.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Shuttlecock fee:</Text>
                    {
                        participant.shuttlecocks.map((shuttlecock) => (
                            <View key={shuttlecock.id} style={styles.ListItemWrapper}>
                                <View style={styles.ListItemTop}>
                                    <Text style={styles.itemTitle}>Contributed: {shuttlecock.name}</Text>
                                    <Text style={styles.itemNeg}>-RM{(shuttlecock.amount * shuttlecock.price / 12).toFixed(2)}</Text>
                                </View>
                                <View style={styles.ListItemBottomWrapper}>
                                    <Text style={styles.ListItemBottomImp}>{shuttlecock.amount} </Text>
                                    <Text style={styles.ListItemBottomNor}>pcs x {'('}</Text>
                                    <Text style={styles.ListItemBottomImp}>RM{shuttlecock.price.toFixed(2)}</Text>
                                    <Text style={styles.ListItemBottomNor}> ÷ 12{')'} price per pc</Text>
                                </View>
                            </View>
                        ))
                    }
                    {
                        allShuttlecocks.map((shuttlecock) => (
                            <View key={shuttlecock.id} style={styles.ListItemWrapper}>
                                <View style={styles.ListItemTop}>
                                    <Text style={styles.itemTitle}>{shuttlecock.name}</Text>
                                    <Text style={shuttlecock.price > 0 ? styles.itemPos : styles.itemNeg}>{shuttlecock.price > 0 ? '+' : '-'}RM{(shuttlecock.amount * (shuttlecock.price / 12) / pAmount).toFixed(2)}</Text>
                                </View>
                                <View style={styles.ListItemBottomWrapper}>
                                    <Text style={styles.ListItemBottomImp}>{shuttlecock.amount} </Text>
                                    <Text style={styles.ListItemBottomNor}>pcs x {'('}</Text>
                                    <Text style={styles.ListItemBottomImp}>RM{shuttlecock.price.toFixed(2)}</Text>
                                    <Text style={styles.ListItemBottomNor}> ÷ 12{')'} price per pc ÷ </Text>
                                    <Text style={styles.ListItemBottomImp}>{pAmount}</Text>
                                    <Text style={styles.ListItemBottomNor}> participants</Text>
                                </View>
                            </View>
                        ))
                    }
                    <View style={styles.subTotalWrapper}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={participant.shuttlecockFee > 0 ? styles.subTotalPos : styles.subTotalNeg}>-RM{Math.abs(participant.shuttlecockFee).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Other fee:</Text>
                    {
                        participant.otherFee.map((other) => (
                            <View key={other.id} style={styles.ListItemWrapper}>
                                <View style={styles.ListItemTop}>
                                    <Text style={styles.itemTitle}>Contributed: {other.name}</Text>
                                    <Text style={styles.itemNeg}>-RM{other.price.toFixed(2)}</Text>
                                </View>
                            </View>
                        ))
                    }
                    {
                        allOtherFees.map((other) => (
                            <View key={other.id} style={styles.ListItemWrapper}>
                                <View style={styles.ListItemTop}>
                                    <Text style={styles.itemTitle}>{other.name}</Text>
                                    <Text style={other.price > 0 ? styles.itemPos : styles.itemNeg}>{other.price > 0 ? '+' : '-'}RM{(other.price / pAmount).toFixed(2)}</Text>
                                </View>
                                <View style={styles.ListItemBottomWrapper}>
                                    <Text style={styles.ListItemBottomImp}>RM{other.price.toFixed(2)}</Text>
                                    <Text style={styles.ListItemBottomNor}> price ÷ </Text>
                                    <Text style={styles.ListItemBottomImp}>{pAmount}</Text>
                                    <Text style={styles.ListItemBottomNor}> participants</Text>
                                </View>
                            </View>
                        ))
                    }
                    <View style={styles.subTotalWrapper}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={participant.otherFees > 0 ? styles.subTotalPos : styles.subTotalNeg}>-RM{Math.abs(participant.otherFees).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    totalNegWrapper: {
        borderRadius: 6,
        borderWidth: 3,
        borderColor: colors.borderPositive,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    totalNegText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: colors.textPosPrimary,
    },
    totalPosWrapper: {
        borderRadius: 6,
        borderWidth: 3,
        borderColor: colors.borderNegative,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    totalPosText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: colors.textNegPrimary,
    },
    sectionWrapper: {
        marginBottom: 32,

    },
    sectionTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,

    },
    sectionListWrapper: {

    },
    ListItemWrapper: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderDefault,
    },
    ListItemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textSecondary,
    },
    itemPos: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textNegTertiary,
    },
    itemNeg: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textPosTertiary,
    },
    ListItemBottomWrapper: {
        flexDirection: 'row',

    },
    ListItemBottomNor: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: colors.textSecondary,
    },
    ListItemBottomImp: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: colors.textSecondary,
    },
    subTotalWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subTotalTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.textSecondary,
    },
    subTotalPos: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.textNegSecondary,

    },
    subTotalNeg: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.textPosSecondary,

    },
});