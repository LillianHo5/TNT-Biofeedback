import React, { useState } from 'react';
import { View, StyleSheet, CheckBox, Text, TextInput, Alert, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

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
        if (name.length == 0) {
            Alert.alert('Please provide a name');
            return;
        }
        if (age.length == 0) {
            Alert.alert('Please provide an age');
            return;
        }
        if (email.length == 0) {
            Alert.alert('Please provide an email');
            return;
        }
        if (initialCheckboxState.f == false && initialCheckboxState.m == false) {
            Alert.alert("Please provide your sex")
            return;
        }
        if (password.length == 0) {
            Alert.alert('Please provide a password');
            return;
        }
        if (confirmPassword.length == 0) {
            Alert.alert('Please re-renter your password');
            return;
        }
        // Set sex value 
        if (initialCheckboxState.f == true) {
            setSex('f');
        } else if (initialCheckboxState.m == true) {
            setSex('m');
        }
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => setAge(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your email'
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your password'
                onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Re-enter your password'
                onChangeText={(value) => setConfirmPassword(value)}
            />
            <View style={styles.checkboxWrapper}>
                <CheckBox
                    value={initialCheckboxState.f}
                    onValueChange={(value) =>
                        setInitialCheckboxState({
                            ...initialCheckboxState,
                            f: value,
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
                        })
                    }
                    style={styles.checkbox}
                />
                <Text>M</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center'
    },
    checkbox: {
        alignSelf: 'center',
    }
});