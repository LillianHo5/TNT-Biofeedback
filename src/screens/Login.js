import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Image } from 'react-native';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB.db');

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            console.log('Table created successfully in Login');

        } catch (error) {
            console.log('Error occurred while creating the table: ', error);
        }
    };

    const getData = async () => {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "SELECT * FROM Users WHERE Email = ? AND Password = ?",
                    [email, password],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var retrievedName = results.rows.item(0).Name;
                            navigation.navigate('Home', { name: retrievedName });
                        } else {
                            console.log("Invalid username or password");
                        }
                    }
                )
            })
        } catch (error) {
            console.log('Error occurred while logging in: ', error)
        }
    }

    const resetPassword = () => {
        //navigation.navigate('ResetPassword');
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../../assets/biofeedback-logo.png')}
            />
            <Text style={styles.header}>Login</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
            />
            <Pressable style={styles.button} onPress={getData}>
                <Text style={{ color: 'white' }}>Login</Text>
            </Pressable>
            <Pressable style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ color: 'white' }}>Not a user? Sign up!</Text>
            </Pressable>
            <Text style={styles.resetPassword} onPress={() => resetPassword()}>Forgot your password?</Text>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 30,
        marginBottom: 25,
        marginTop: 20
    },
    icon: {
        alignSelf: 'center',
        width: 100,
        height: 100,
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
        backgroundColor: 'white',
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
        backgroundColor: '#3D59AB',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
    signUpButton: {
        backgroundColor: '#191970',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
    buttonText: {
        borderRadius: 5
    },
    resetPassword: {
        marginBottom: 35
    }
});