import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB.db');

export default function SignUp({ navigation }) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [initialCheckboxState, setInitialCheckboxState] = useState({
        f: false,
        m: false,
    });
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        createTable();
        setData();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER, Email TEXT, Sex TEXT, Password TEXT);"
            )
        })
    }

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
        if (!checkboxState.f && !checkboxState.m) {
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
        const sex = checkboxState.f ? 'f' : 'm';
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "INSERT INTO Users (Name, Age, Email, Sex, Password) VALUES (?, ?, ?, ?, ?)",
                    [name, age, email, sex, password]
                );
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={stylesContainer.container}>
            <TextInput
                style={stylesContainer.input}
                placeholder='Enter your name'
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={stylesContainer.input}
                placeholder='Enter your age'
                onChangeText={(value) => setAge(value)}
            />
            <TextInput
                style={stylesContainer.input}
                placeholder='Enter your email'
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={stylesContainer.input}
                placeholder='Enter your password'
                onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                style={stylesContainer.input}
                placeholder='Re-enter your password'
                onChangeText={(value) => setConfirmPassword(value)}
            />
            <View style={stylesContainer.checkboxWrapper}>
                <CheckBox
                    value={initialCheckboxState.f}
                    onValueChange={(value) =>
                        setInitialCheckboxState({
                            ...initialCheckboxState,
                            f: value,
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
                        })
                    }
                    style={stylesContainer.checkbox}
                />
                <Text>M</Text>

            </View>
        </View>
    );
}


const stylesContainer = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }, input: {
        // your input styles here
    },
    checkboxWrapper: {
        // your checkboxWrapper styles here
    },
    checkbox: {
        alignSelf: 'center',
    }
});