import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/colors/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonListItem from './ButtonListItem';
import BottomButton from './BottomButton';

export default Participants = ({ navigation, route }) => {
    var [participants, setParticipants] = useState([]);
    useEffect(() => {
        if (route.params) {
            setParticipants(route.params);
        }
    }, [route.params]);

    const removeParticipant = (id) => {
        setParticipants(participants.filter(participant => participant.id !== id));
    };

    const doneParticipants = () => {
        if (participants.length > 0) {
            navigation.navigate('Hours', {participants})
        }
        else {
            Alert.alert("Error", "Cannot proceed with zero participants.", [
                {
                    text: "OK"
                },
            ])
        }
    };

    const renderParticipantItem = (participant) => {
        return (
            <View style={styles.participantListItem}>
                <TouchableOpacity onPress={() => navigation.navigate('EditParticipant', {
                    participants:participants,
                    participant:participant.item,
                    index:participant.index
                })} style={styles.participantListItemTextWrapper}>
                    <Text style={styles.participantListItemText}>{participant.item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeParticipant(participant.item.id)}>
                    <View style={styles.participantListItemIconWrapper}>
                        <AntDesign name="close" style={styles.participantListItemIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.Body}>
                <Header
                    title="Participants"
                    subtitle="Who joined?"
                    onBackPress={() => navigation.goBack()}
                />
                <View>
                    <ButtonListItem
                        icon="plus"
                        text="Add participant"
                        onBackPress={() => navigation.navigate('AddParticipant', { participants })}
                    />
                    <ButtonListItem
                        icon="copy1"
                        text="Paste list of participants"
                        onBackPress={() => navigation.navigate('PasteParticipants', { participants })}
                    />
                </View>
                <View style={styles.participantListWrapper}>
                    <FlatList
                        data={participants}
                        renderItem={renderParticipantItem}
                        keyExtractor={(participants) => participants.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

            <BottomButton
                text="Continue"
                onBackPress={() => doneParticipants()}
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
    participantListWrapper: {
        maxHeight: "55%",
        marginTop: 8
    },
    participantListItem: {
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1
    },
    participantListItemTextWrapper: {
        flex: 1
    },
    participantListItemText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
    participantListItemIconWrapper: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    participantListItemIcon: {
        fontSize: 24,
        color: colors.textPrimary,
    },
});

