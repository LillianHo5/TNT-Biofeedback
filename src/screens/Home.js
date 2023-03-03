import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB.db');

export default function Home({ navigation, route }) {
    return (
        <View>
            <Text>Hi!</Text>
        </View>
    )
}