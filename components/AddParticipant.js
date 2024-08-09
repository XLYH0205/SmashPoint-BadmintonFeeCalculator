import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import colors from '../assets/colors/colors';

export default AddParticipant = ({ route, navigation }) => {
    var [participants, setParticipants] = useState(route.params?.participants);
    const [name, setName] = useState('');
    var [shuttlecocks, setShuttlecocks] = useState(route.params?.newShuttlecocks ? route.params.newShuttlecocks : []);
    var [otherFees, setOtherFees] = useState(route.params?.newOtherFees ? route.params.newOtherFees : []);
    const [borderColor, setBorderColor] = useState(colors.borderDefault);

    useEffect(() => {
        if (route.params?.newShuttlecocks) {
            setShuttlecocks(route.params.newShuttlecocks);
        }
    }, [route.params?.newShuttlecocks]);

    useEffect(() => {
        if (route.params?.newOtherFees) {
            setOtherFees(route.params.newOtherFees);
        }
    }, [route.params?.newOtherFees]);

    var newParticipant = {
        id: '',
        name: '',
        shuttlecocks: [],
        otherFee: []
    }

    const navigateAddShuttlecock = () => {
        navigation.navigate('AddShuttlecock', {
            source:'AddParticipant',
            shuttlecocks: shuttlecocks
        });
    };
    
    const navigateAddOtherFee = () => {
        navigation.navigate('AddOtherFee', {
            source:'AddParticipant',
            otherFees: otherFees
        });
    };

    const doneAddParticipant = () => {
        if (name !== '') {
            newParticipant.id = name;
            newParticipant.name = name;
            newParticipant.shuttlecocks = shuttlecocks;
            newParticipant.otherFee = otherFees;
            participants = [...participants, newParticipant];
            navigation.navigate('Participants', participants)
        }
        else {
            Alert.alert("Error", "Name cannot be empty.", [
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
                        title="Add Participant"
                        subtitle="Enter info below"
                        onBackPress={() => navigation.goBack()}
                    />
                    <View style={styles.nameWrapper}>
                        <Text style={styles.inputTitle}>Name</Text>
                        <TextInput
                            style={[styles.nameInput, { borderColor: borderColor }]}
                            onFocus={() => setBorderColor(colors.borderPositive)}
                            onBlur={() => setBorderColor(colors.borderDefault)}
                            placeholder='Type participant name'
                            placeholderTextColor={colors.textSecondary}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.sconWrapper}>
                        <Text style={styles.inputTitle}>Shuttlecock Contributions</Text>
                        <View style={styles.shuttlecocksListWrapper}>
                            {shuttlecocks.map((item) => (
                                <TouchableOpacity key={item.id} >
                                    <View style={styles.ListItemWrapper}>
                                        <View style={styles.ListItemTextWrapper}>
                                            <Text style={styles.listItemTitle}>{item.name}</Text>
                                            <Text style={styles.sTextPrice}>Price per dozen: RM{item.price.toFixed(2)}</Text>
                                        </View>
                                        <Text style={styles.ListItemRightText}>{item.amount}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={navigateAddShuttlecock}>
                                <View style={styles.addWrapper}>
                                    <AntDesign name="plus" style={styles.addIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.otherWrapper}>
                        <Text style={styles.inputTitle}>Other Fee</Text>
                        <View style={styles.otherListWrapper}>
                            {otherFees.map((item) => (
                                <TouchableOpacity key={item.id} >
                                    <View style={styles.ListItemWrapper}>
                                        <View style={styles.ListItemTextWrapper}>
                                            <Text style={styles.listItemTitle}>{item.name}</Text>
                                        </View>
                                        <Text style={styles.ListItemRightText}>RM{item.price.toFixed(2)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={navigateAddOtherFee}>
                                <View style={styles.addWrapper}>
                                    <AntDesign name="plus" style={styles.addIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <BottomButton
                    text="Done"
                    onBackPress={() => doneAddParticipant()}
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
    nameWrapper: {
        marginBottom: 16
    },
    inputTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 6,
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
    sconWrapper: {
        marginBottom: 16,
    },
    shuttlecocksListWrapper: {
        marginTop: 6,
    },
    addWrapper: {
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12
    },
    addIcon: {
        fontSize: 24,
        color: colors.textSecondary,
    },
    ListItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1,
    },
    ListItemTextWrapper: {
        flex: 1
    },
    listItemTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.textPrimary,
    },
    sTextPrice: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: colors.textSecondary,
    },
    ListItemRightText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: colors.textPrimary,
    },
    oPrice: {

    },
});

