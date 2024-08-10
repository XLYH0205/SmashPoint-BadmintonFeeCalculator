import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import colors from '../assets/colors/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ButtonListItem = ({ icon, text, onBackPress }) => {
    return (
        < TouchableWithoutFeedback onPress={onBackPress}>
            <View style={styles.buttonListItemWrapper}>
                <View style={styles.buttonListItemIconWrapper}>
                    <AntDesign name={icon} style={styles.buttonListItemIcon} />
                </View>
                <Text style={styles.buttonListItemText}>{text}</Text>
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    buttonListItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    buttonListItemIconWrapper: {
        backgroundColor: colors.backgroundButton,
        padding: 8,
        borderRadius: 8,
        marginRight: 16,
    },
    buttonListItemIcon: {
        fontSize: 24,
        color: colors.textPrimary
    },
    buttonListItemText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
});

export default ButtonListItem;