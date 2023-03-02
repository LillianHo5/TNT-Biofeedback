import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB.db');

export default function SignUp({ navigation }) {
    console.log('SignUp component is rendering');

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [initialCheckboxState, setInitialCheckboxState] = useState({
        f: false,
        m: false,
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        createTable();
    }, []);

    const createTable = async () => {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS " +
                    "Users " +
                    "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER, Email TEXT, Sex TEXT, Password TEXT);"
                );
            });
            console.log('Table created successfully');

        } catch (error) {
            console.log('Error occurred while creating the table: ', error);
        }
    };


    const setData = async () => {
        if (!name && !age && !email & !initialCheckboxState.f && !initialCheckboxState.m && !password && !confirmPassword) {
            Alert.alert('Please provide your information.');
            return;
        }
        if (!name) {
            Alert.alert('Please provide a name');
            return;
        }
        if (!age) {
            Alert.alert('Please provide an age');
            return;
        }
        if (!email) {
            Alert.alert('Please provide an email');
            return;
        }
        if (!initialCheckboxState.f && !initialCheckboxState.m) {
            Alert.alert("Please provide your sex")
            return;
        }
        if (!password) {
            Alert.alert('Please provide a password');
            return;
        }
        if (!confirmPassword) {
            Alert.alert('Please re-enter your password');
            return;
        }
        // Set sex value 
        const sex = initialCheckboxState.f ? 'f' : 'm';
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "INSERT INTO Users (Name, Age, Email, Sex, Password) VALUES (?, ?, ?, ?, ?)",
                    [name, age, email, sex, password],
                    () => {
                        console.log('Data inserted successfully');
                        //navigation.navigate('Login');
                    },
                    error => console.log('Error occurred while inserting data: ', error)
                );
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textGroup}>
                <Text style={styles.label}>Name</Text>
                <Text>*</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(value) => setName(value)}
            />
            <View style={styles.textGroup}>
                <Text style={styles.label}>Age</Text>
                <Text>*</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={(value) => setAge(value)}
            />
            <View style={styles.checkboxGroup}>
                <View style={styles.textGroup}>
                    <Text style={styles.label}>Sex</Text>
                    <Text>*</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <Text>M</Text>
                    <CheckBox
                        value={initialCheckboxState.f}
                        onValueChange={(value) =>
                            setInitialCheckboxState({
                                ...initialCheckboxState,
                                f: value,
                                m: !value, // automatically uncheck the other checkbox
                            })
                        }
                        style={styles.checkbox}
                    />
                    <Text>F</Text>
                    <CheckBox
                        value={initialCheckboxState.m}
                        onValueChange={(value) =>
                            setInitialCheckboxState({
                                ...initialCheckboxState,
                                m: value,
                                f: !value, // automatically uncheck the other checkbox
                            })
                        }
                        style={styles.checkbox}
                    />
                </View>
            </View>
            <View style={styles.textGroup}>
                <Text style={styles.label}>Email</Text>
                <Text>*</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
            />
            <View style={styles.textGroup}>
                <Text style={styles.label}>Password</Text>
                <Text>*</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
            />
            <View style={styles.textGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <Text>*</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(value) => setConfirmPassword(value)}
            />
            <Pressable style={styles.button} onPress={setData}>
                <Text styles={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textGroup: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },

    label: {
        fontSize: '18px',
        marginRight: 20,
        marginLeft: 55,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    checkboxGroup: {
        flexDirection: 'row',
        width: '100%'
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    input: {
        height: 40,
        width: '70%',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 30,
    },
    checkbox: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF'
    },
    button: {
        // Add styling
    }
});