import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import colors from '../assets/colors/colors';

export default AddShuttlecock = ({ route, navigation }) => {
    var shuttlecocks = route.params.shuttlecocks;
    const [nameBorderColor, setNameBorderColor] = useState(colors.borderDefault);
    const [priceBorderColor, setPriceBorderColor] = useState(colors.borderDefault);    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState(0);

    var newShuttlecock = {
        id: '',
        name: '',
        price:0,
        amount:0
    }

    const doneAddShuttlecock = () => {
        if (name !== '' &&
            price !== '' && 
            amount !== 0
        ) {
            newShuttlecock.id = shuttlecocks.length+1;
            newShuttlecock.name = name;
            newShuttlecock.price = parseFloat(price);
            newShuttlecock.amount = amount;
            shuttlecocks = [...shuttlecocks, newShuttlecock];
            if(route.params.source === 'EditParticipant'){
                navigation.navigate('EditParticipant', { newShuttlecocks: shuttlecocks, participant: route.params.participant})
            }
            else if(route.params.source === 'AddParticipant'){
                navigation.navigate('AddParticipant', { newShuttlecocks: shuttlecocks, participant: route.params.participant})
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
                    title="Add Shuttlecock"
                    subtitle="Enter info below"
                    onBackPress={() => navigation.goBack()}
                />
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Name</Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: nameBorderColor }]}
                        onFocus={() => setNameBorderColor(colors.borderPositive)}
                        onBlur={() => setNameBorderColor(colors.borderDefault)}
                        placeholder='Type shuttlecock name'
                        placeholderTextColor={colors.textSecondary}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Price per dozen</Text>
                    <TextInput
                        style={[styles.textInput, { borderColor: priceBorderColor }]}
                        onFocus={() => setPriceBorderColor(colors.borderPositive)}
                        onBlur={() => setPriceBorderColor(colors.borderDefault)}
                        placeholder='Type price of shuttlecock'
                        placeholderTextColor={colors.textSecondary}
                        onChangeText={setPrice}
                    />
                </View>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Shuttlecock Amount</Text>
                    <View style={styles.incrementerWrapper}>
                        <TouchableOpacity onPress={() => {
                            setAmount(amount == 0 ? amount : amount -1)
                        }}>
                            <AntDesign name="minuscircle" style={styles.incrementerIcon} />
                        </TouchableOpacity>
                        <Text style={styles.incrementerText}>{amount}</Text>
                        <TouchableOpacity onPress={() => {
                            setAmount(amount + 1)
                        }}>
                            <AntDesign name="pluscircle" style={styles.incrementerIcon} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <BottomButton
                text="Done"
                onBackPress={() => doneAddShuttlecock()}
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
    incrementerWrapper: {
        marginTop:10,
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
});