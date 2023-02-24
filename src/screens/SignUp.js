import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Button } from 'react-native';
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
        <View style={stylesContainer.container}>
            <Text>Enter your name:</Text>
            <TextInput
                style={stylesContainer.input}
                placeholder="Name"
                onChangeText={(value) => setName(value)}
            />
            <Text>Enter your age:</Text>
            <TextInput
                style={stylesContainer.input}
                placeholder="Age"
                onChangeText={(value) => setAge(value)}
            />
            <Text>Enter your email:</Text>
            <TextInput
                style={stylesContainer.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
            />
            <Text>Enter your password:</Text>
            <TextInput
                style={stylesContainer.input}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
            />
            <Text>Confirm your password:</Text>
            <TextInput
                style={stylesContainer.input}
                placeholder="Confirm Password"
                onChangeText={(value) => setConfirmPassword(value)}
            />
            <View style={stylesContainer.checkboxWrapper}>
                <CheckBox
                    value={initialCheckboxState.f}
                    onValueChange={(value) =>
                        setInitialCheckboxState({
                            ...initialCheckboxState,
                            f: value,
                            m: !value, // automatically uncheck the other checkbox
                        })
                    }
                    style={stylesContainer.checkbox}
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
                    style={stylesContainer.checkbox}
                />
                <Text>M</Text>
            </View>
            <Button title="Submit" onPress={setData} />
        </View>
    );

}

const stylesContainer = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF'
    }
});
