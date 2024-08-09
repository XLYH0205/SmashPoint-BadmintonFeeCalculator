import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/colors';

const Header = ({ title, subtitle, onBackPress }) => {
    return (
        <SafeAreaView>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={onBackPress}>
                    <View style={styles.headerBackWrapper}>
                        <AntDesign name="left" style={styles.headerBackIcon} />
                    </View>
                </TouchableOpacity>
                <View style={styles.headerTitlesWrapper}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.headerSubtitle}>{subtitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 24,
    },
    headerBackWrapper: {
        backgroundColor: colors.backgroundPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        padding: 6,
    },
    headerBackIcon: {
        color: colors.onPrimary,
        fontSize: 16,
    },
    headerTitlesWrapper: {
        flex: 1,
        marginLeft: 26,
    },
    headerTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 22,
        color: colors.textPrimary,
    },
    headerSubtitle: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: colors.textSecondary,
    },
});

export default Header;
