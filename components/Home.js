import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';
import LogoIconOnly from '../assets/svg/LogoIconOnly';

export default Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LogoIconOnly />
            <View style={styles.logoWrapper}>
                <Text style={styles.logoTitle}>SmashPoint</Text>
                <Text style={styles.logSubtitle}>Badminton Fee Calculator</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
                <View style={styles.buttonWrapper}>
                    <Text style={styles.buttonText}>Calculate Now</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTitle: {
        fontFamily: 'Alatsi-Regular',
        fontSize: 32,
        color: colors.textPrimary,
        marginBottom: 6,
    },
    logSubtitle: {
        fontFamily: 'Alatsi-Regular',
        fontSize: 20,
        color: colors.textSecondary,
    },
    buttonWrapper: {
        backgroundColor: colors.backgroundPrimary,
        paddingVertical: 12,
        paddingHorizontal: 104,
        marginTop: 32,
        borderRadius: 8
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.onPrimary,
    },
});