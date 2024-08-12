import React, { useState } from 'react';

import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import colors from '../assets/colors/colors';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';

export default PasteParticipants = ({ route, navigation }) => {
    var participants = route.params?.participants;
    const [borderColor, setBorderColor] = useState(colors.borderDefault);
    const [texts, setText] = useState('');

    const doneAddParticipants = () => {
        if (texts !== '') {
            const lines = texts.split('\n');
            const names = lines
                .filter(line => line.includes('.'))
                .map(line => line.split('.')[1]);
            names.forEach((name) => {
                var newParticipant = {
                    id: name,
                    name: name,
                    shuttlecock: [],
                    otherFee: []
                }
                participants = [...participants, newParticipant];
            })
            navigation.navigate('Participants', participants)
        }
        else {
            Alert.alert("Error", "Text input cannot be empty.", [
                {
                    text: "OK"
                },
            ])
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.Body}>
                <Header
                    title="Add Participants"
                    subtitle="Paste List of Participants"
                    onBackPress={() => navigation.goBack()}
                />
                <TextInput
                    style={[styles.nameInput, { borderColor: borderColor }]}
                    onFocus={() => setBorderColor(colors.borderPositive)}
                    onBlur={() => setBorderColor(colors.borderDefault)}
                    placeholder='Paste in here'
                    placeholderTextColor={colors.textSecondary}
                    multiline={true}
                    onChangeText={setText}
                />
                <View style={styles.infoWrapper}>
                    <Text style={styles.infoTitle}>1. Text must be multi-line</Text>
                    <Text style={styles.infoTitle}>2. Text must include number and "."</Text>
                    <Text style={styles.infoTitle}>Example:</Text>
                    <Text style={styles.example}>{"11/8 2-5pm\n1. Peter\n2. Tom\n3. Jack\n4.Jane"}</Text>
                </View>
            </View>

            <BottomButton
                text="Done"
                onBackPress={() => doneAddParticipants()}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
    },
    nameInput: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: colors.borderDefault,
        borderWidth: 1,
        borderRadius: 8,
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: colors.textSecondary,
    },
    infoWrapper: {
        marginTop: 16
    },
    example: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: colors.textSecondary,
    },
    infoTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
});