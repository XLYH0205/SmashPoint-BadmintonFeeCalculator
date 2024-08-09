import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';

const BottomButton = ({ text, onBackPress }) => {
    return (
        < TouchableOpacity onPress={onBackPress}>
            <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor:colors.backgroundPrimary,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:12,
        marginVertical:32,
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.onPrimary,
    },
});

export default BottomButton;