import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from 'react-native-check-box'

import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import colors from '../assets/colors/colors';

export default AddHour = ({ route, navigation }) => {
    const participants = route.params.participants;
    var [hours, setHours] = useState(route.params?.hours);
    const [nameBorderColor, setNameBorderColor] = useState(colors.borderDefault);
    const [priceBorderColor, setPriceBorderColor] = useState(colors.borderDefault);
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [court, setCourt] = useState(0);
    const [attendance, setAttendance] = useState(
        participants.map(participant => participant.name)
    );
    const [isChecked, setIsChecked] = useState(
        participants.reduce((acc, participant) => {
            acc[participant.name] = true;
            return acc;
        }, {})
    );

    var newHour = {
        id: '',
        time: '',
        court: 0,
        price: 0,
        attendance: []
    }

    const toggleCheckBox = (name) => {
        const newIsChecked = { ...isChecked, [name]: !isChecked[name] };
        setIsChecked(newIsChecked);

        if (newIsChecked[name]) {
            setAttendance([...attendance, name]);
        } else {
            setAttendance(attendance.filter((participantName) => participantName !== name));
        }
    };

    const doneAddHour = () => {
        if (
            time !== '' &&
            court !== 0 &&
            price !== 0 &&
            attendance.length !== 0
        ) {
            newHour.id = hours.length + 1;
            newHour.time = time;
            newHour.court = court;
            newHour.price = parseFloat(price);
            newHour.attendance = attendance;
            hours = [...hours, newHour];
            navigation.navigate('Hours', { hours: hours, participants: participants })
        }
        else {
            Alert.alert("Error", "No input can be empty.", [
                {
                    text: "OK"
                },
            ])
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.Body}>
                    <Header
                        title="Add Hour"
                        subtitle="Enter info below"
                        onBackPress={() => navigation.goBack()}
                    />
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionTitle}>{'Name(Time)'}</Text>
                        <TextInput
                            style={[styles.textInput, { borderColor: nameBorderColor }]}
                            onFocus={() => setNameBorderColor(colors.borderPositive)}
                            onBlur={() => setNameBorderColor(colors.borderDefault)}
                            placeholder='Type the time'
                            placeholderTextColor={colors.textSecondary}
                            onChangeText={setTime}
                        />
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionTitle}>{'Rental fee (per hour per court)'}</Text>
                        <TextInput
                            style={[styles.textInput, { borderColor: priceBorderColor }]}
                            onFocus={() => setPriceBorderColor(colors.borderPositive)}
                            onBlur={() => setPriceBorderColor(colors.borderDefault)}
                            placeholder='Type price of court'
                            placeholderTextColor={colors.textSecondary}
                            onChangeText={setPrice}
                        />
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionTitle}>Court Amount</Text>
                        <View style={styles.incrementerWrapper}>
                            <TouchableOpacity onPress={() => {
                                setCourt(court == 0 ? court : court - 1)
                            }}>
                                <AntDesign name="minuscircle" style={styles.incrementerIcon} />
                            </TouchableOpacity>
                            <Text style={styles.incrementerText}>{court}</Text>
                            <TouchableOpacity onPress={() => {
                                setCourt(court + 1)
                            }}>
                                <AntDesign name="pluscircle" style={styles.incrementerIcon} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionTitle}>Attendance</Text>
                        <View style={styles.attendanceWrapper}>
                            {participants.map((participant) => (
                                <View key={participant.id}>
                                    <CheckBox
                                        style={styles.attendanceItemWrapper}
                                        leftText={participant.name}
                                        leftTextStyle={styles.listItemTitle}
                                        checkedCheckBoxColor={colors.backgroundCheckbox}
                                        uncheckedCheckBoxColor={colors.backgroundCheckbox}
                                        onClick={() => toggleCheckBox(participant.name)}
                                        isChecked={isChecked[participant.name]}

                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <BottomButton
                    text="Done"
                    onBackPress={() => doneAddHour()}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    textInput: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: colors.borderDefault,
        borderWidth: 1,
        borderRadius: 8,
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: colors.textSecondary,
    },
    sectionWrapper: {
        marginBottom: 16
    },
    sectionTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 6
    },
    incrementerWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    incrementerIcon: {
        fontSize: 24,
        color: colors.textSecondary,
    },
    incrementerText: {
        marginHorizontal: 16,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textPrimary,
    },
    attendanceItemWrapper: {
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1
    },
    listItemTitle: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textPrimary,
    }
});