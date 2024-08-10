import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from 'react-native';

import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import colors from '../assets/colors/colors';

export default AddOtherFee = ({ route, navigation }) => {
    var otherFees = route.params.otherFees;
    const [nameBorderColor, setNameBorderColor] = useState(colors.borderDefault);
    const [priceBorderColor, setPriceBorderColor] = useState(colors.borderDefault);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    var newFee = {
        id: '',
        name: '',
        price: 0,
    }

    const doneAddOtherFee = () => {
        if (name !== '' &&
            price !== ''
        ) {
            newFee.id = otherFees.length + 1;
            newFee.name = name;
            newFee.price = parseFloat(price);
            otherFees = [...otherFees, newFee];
            if (route.params.source === 'EditParticipant') {
                navigation.navigate('EditParticipant', { newOtherFees: otherFees, participant: route.params.participant })
            }
            else if (route.params.source === 'AddParticipant') {
                navigation.navigate('AddParticipant', { newOtherFees: otherFees, participant: route.params.participant })
            }
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
            <View style={styles.Body}>
                <Header
                    title="Add Other Fee"
                    subtitle="Enter info below"
                    onBackPress={() => navigation.goBack()}
                />
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Name</Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: nameBorderColor }]}
                        onFocus={() => setNameBorderColor(colors.borderPositive)}
                        onBlur={() => setNameBorderColor(colors.borderDefault)}
                        placeholder='Type the name'
                        placeholderTextColor={colors.textSecondary}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Price</Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: priceBorderColor }]}
                        onFocus={() => setPriceBorderColor(colors.borderPositive)}
                        onBlur={() => setPriceBorderColor(colors.borderDefault)}
                        placeholder='Type the price'
                        placeholderTextColor={colors.textSecondary}
                        onChangeText={setPrice}
                    />
                </View>
            </View>

            <BottomButton
                text="Done"
                onBackPress={() => doneAddOtherFee()}
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
    infoWrapper: {
        marginTop: 16
    },
    infoTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
    },
});