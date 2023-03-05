import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB.db');

export default function Home({ navigation, route }) {
    const [Name, setName] = useState('');

    useEffect(() => {
        createTable();
        getData();
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
            console.log('Table created successfully in Home');

        } catch (error) {
            console.log('Error occurred while creating the table: ', error);
        }
    }

    const getData = async () => {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "SELECT Name FROM Users",
                    [],
                    (tx, results) => {
                        var userName = results.rows.item(0).Name;
                        setName(userName);
                    }
                )
            })
        } catch (error) {
            console.log('Error occurred while logging in: ', error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hi {route.params.name || Name}!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 50
    },
});