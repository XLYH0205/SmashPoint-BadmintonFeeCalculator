import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/colors/colors';

import CheckBox from 'react-native-check-box';

export default Participants = ({ navigation, route }) => {
    var participants = route.params.participants;
    var hours = route.params.hours;

    const allShuttlecocks = participants
        .filter(participant => participant.shuttlecocks && participant.shuttlecocks.length > 0)
        .flatMap(participant => participant.shuttlecocks);

    for (let index = 0; index < allShuttlecocks.length; index++) {
        let item = allShuttlecocks[index];
        item.id = index.toString();        
    }
    
    const allOtherFees = participants
    .filter(participant => participant.otherFee && participant.otherFee.length > 0)
    .flatMap(participant => participant.otherFee);
    
    for (let index = 0; index < allOtherFees.length; index++) {
        let item = allOtherFees[index];
        item.id = index.toString();        
    }

    participants.forEach(participant => {
        let courtFee = 0;
        let shuttlecockFee = 0;
        let otherFees = 0;
        let totalFee = 0;

        // COURT FEE
        hours.forEach(hour => {
            if (hour.attendance.includes(participant.name)) {
                courtFee += (hour.court * hour.price / hour.attendance.length);
            }
        });

        // SHUTTLECOCK FEE
        if (participant.shuttlecocks) {
            participant.shuttlecocks.forEach(shuttlecock => {
                shuttlecockFee -= (shuttlecock.amount * (shuttlecock.price / 12));
            });
        }

        allShuttlecocks.forEach(shuttlecock => {
            shuttlecockFee += (shuttlecock.amount * (shuttlecock.price / 12) / participants.length);
        });

        // OTHER FEE
        if (participant.otherFee) {
            participant.otherFee.forEach(otherF => {
                otherFees -= otherF.price;
            });
        }

        allOtherFees.forEach(otherF => {
            otherFees += otherF.price / participants.length;
        });

        totalFee = courtFee + shuttlecockFee + otherFees;


        participant.courtFee = courtFee;
        participant.shuttlecockFee = shuttlecockFee;
        participant.otherFees = otherFees;
        participant.totalFee = totalFee;
    });

    const [isChecked, setIsChecked] = useState(
        participants.reduce((acc, participant) => {
            acc[participant.name] = false;
            return acc;
        }, {})
    );

    const toggleCheckBox = (name) => {
        const newIsChecked = { ...isChecked, [name]: !isChecked[name] };
        setIsChecked(newIsChecked);
    };

    const renderListItem = (obj) => {
        const participant = obj.item;

        return (
            <View style={styles.ListItem}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FeeDetail', {
                        pAmount: participants.length,
                        participant: participant,
                        hours: hours,
                        allShuttlecocks: allShuttlecocks,
                        allOtherFees: allOtherFees
                    })}
                    style={styles.ListItemTextWrapper}
                >
                    <View>
                        <Text style={styles.ListItemName}>{participant.name}</Text>
                        <Text style={styles.ListItemSec}>Court fee: RM {participant.courtFee.toFixed(2)}</Text>
                        <Text style={styles.ListItemSec}>Shuttlecock fee: {participant.shuttlecockFee > 0 ? '' : '-'}RM{Math.abs(participant.shuttlecockFee).toFixed(2)}</Text>
                        <Text style={styles.ListItemSec}>Other fee: {participant.otherFees > 0 ? '' : '-'}RM{Math.abs(participant.otherFees).toFixed(2)}</Text>
                        <Text style={styles.ListItemTotal}>Total fees: RM{(participant.totalFee).toFixed(2)}</Text>
                    </View>
                </TouchableOpacity>
                <CheckBox
                    isChecked={isChecked[participant.name]}
                    onClick={() => toggleCheckBox(participant.name)}
                    checkedCheckBoxColor={colors.backgroundCheckbox}
                    uncheckedCheckBoxColor={colors.backgroundCheckbox}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.Body}>
                <Header
                    title="Result"
                    subtitle="Total fees"
                    onBackPress={() => navigation.goBack()}
                />
                <View style={styles.ListWrapper}>
                    <FlatList
                        data={participants}
                        renderItem={renderListItem}
                        keyExtractor={(participant) => participant.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.msgWrapper}>
                    <Text style={styles.msgText}>Tips: Kindly use the checkboxes to keep track of who has paid you.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    ListItem: {
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1,
    },
    ListItemTextWrapper: {
        flex: 1,
    },
    ListItemSec: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: colors.textSecondary,
    },
    ListItemName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
    ListItemTotal: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.textNegSecondary,
    },
    msgWrapper: {
        marginTop: 16
    },
    msgText: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: colors.textSecondary,
    },
});

