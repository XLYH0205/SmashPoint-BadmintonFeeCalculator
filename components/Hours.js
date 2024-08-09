import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/colors/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonListItem from './ButtonListItem';
import BottomButton from './BottomButton';

export default Participants = ({ navigation, route }) => {
    var [hours, setHours] = useState([]);
    useEffect(() => {
        if (route.params?.hours) {
            setHours(route.params?.hours);
        }
    }, [route.params?.hours]);

    const navigateAddHour = () => {
        navigation.navigate('AddHour', {hours: hours, participants: route.params.participants});
    };

    const removeHour = (id) => {
        setHours(hours.filter(hour => hour.id !== id));
    };

    const doneHours = () => {
        console.log('hours', hours);
        console.log('participants', route.params.participants);
    };

    const renderHourItem = (hour) => {
        return (
            <View style={styles.hourListItem}>
                <View style={styles.hourListItemTextWrapper}>
                    <Text style={styles.hourListItemTime}>{hour.item.time}</Text>
                    <Text style={styles.hourListItemInfo}>Court: {hour.item.court}</Text>
                    <Text style={styles.hourListItemInfo}>Price per court per hour: RM{parseFloat(hour.item.price).toFixed(2)}</Text>
                    <Text style={styles.hourListItemInfo}>Participants: {hour.item.attendance}</Text>
                </View>
                <TouchableOpacity onPress={() => removeHour(hour.item.id)}>
                    <View style={styles.hourListItemIconWrapper}>
                        <AntDesign name="close" style={styles.hourListItemIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.Body}>
                <Header
                    title="Hours"
                    subtitle="How long you played?"
                    onBackPress={() => navigation.goBack()}
                />
                <View>
                    <ButtonListItem
                        icon="plus"
                        text="Add hour"
                        onBackPress={navigateAddHour}
                    />
                </View>
                <View style={styles.hourListWrapper}>
                    <FlatList
                        data={hours}
                        renderItem={renderHourItem}
                        keyExtractor={(hours) => hours.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

            <BottomButton
                text="Continue"
                onBackPress={() => doneHours()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    hourListWrapper: {
        maxHeight: "55%",
        marginTop: 8
    },
    hourListItem: {
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1
    },
    hourListItemTextWrapper: {
        flex: 1
    },
    hourListItemInfo:{
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: colors.textSecondary,
    },
    hourListItemTime: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
    hourListItemIconWrapper: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hourListItemIcon: {
        fontSize: 24,
        color: colors.textPrimary,
    },
});

